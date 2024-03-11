const express = require('express');
const router = express.Router();
const { Client } = require('pg');
const db = require('../database/dbconfig');


router.get('/', async (req, res) => {
    const client = new Client(db); 
    try {
        client.connect();
        let skip = req.query.skip || 0;
        let take = req.query.take || 50;
        
        const result = await client.query(`SELECT * FROM film LIMIT ${take} OFFSET ${skip}`);
        
        const films = result.rows;
        res.json(films);
      
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        client.end();
    }
});

router.post('/crear', async (req, res) => {
    const { title, description, release_year, language_id, rental_duration, rental_rate, length, replacement_cost } = req.body;

    // Validar los datos recibidos
    if (!title || !description || !release_year || !language_id || !rental_duration || !rental_rate || !length || !replacement_cost) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const client = new Client(db);
    try {
        client.connect();

        // Insertar nueva película en la base de datos
        const result = await client.query('INSERT INTO film (title, description, release_year, language_id, rental_duration, rental_rate, length, replacement_cost) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', 
            [title, description, release_year, language_id, rental_duration, rental_rate, length, replacement_cost]);

        res.status(201).json(result.rows[0]); // Devolver la nueva película creada
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar la película' });
    } finally {
        client.end();
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const client = new Client(db);
    try {
        client.connect();

        const rentalCheckResult = await client.query('SELECT COUNT(*) FROM rental WHERE inventory_id IN (SELECT inventory_id FROM inventory WHERE film_id = $1)', [id]);
        const rentalCount = parseInt(rentalCheckResult.rows[0].count);

        if (rentalCount > 0) {
            return res.status(400).json({ message: 'No se puede eliminar la película porque está siendo utilizada en transacciones de alquiler.' });
        }

        await client.query('DELETE FROM film_actor WHERE film_id = $1', [id]);
        await client.query('DELETE FROM film_category WHERE film_id = $1', [id]);
        await client.query('DELETE FROM inventory WHERE film_id = $1', [id]);
        const result = await client.query('DELETE FROM film WHERE film_id = $1 RETURNING *', [id]);

        res.json(result.rows[0]);
        client.end();
    } catch (error) {
        await client.query('ROLLBACK');
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
