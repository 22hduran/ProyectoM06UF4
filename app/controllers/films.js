const express = require('express');
const router = express.Router();
const { Client } = require('pg');
const db = require('../database/dbconfig');

router.use(express.urlencoded({ extended: true }));

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

    const client = new Client(db);
    try {
        await client.connect();
        const result = await client.query('INSERT INTO film (title, description, release_year, language_id, rental_duration, rental_rate, length, replacement_cost) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', 
            [title, description, release_year, language_id, rental_duration, rental_rate, length, replacement_cost]);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar la película' });
    } finally {
        client.end();
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const client = new Client(db);
    try {
        await client.connect();
        const result = await client.query('SELECT * FROM film WHERE film_id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Película no encontrada' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    } finally {
        client.end();
    }
});


router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, release_year, language_id, rental_duration, rental_rate, length, replacement_cost } = req.body;
    console.log('body: ');
    console.log(req.body);

    if (!title || !description || !release_year || !language_id || !rental_duration || !rental_rate || !length || !replacement_cost) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    const client = new Client(db);
    try {
        await client.connect();

        // const existingFilm = await client.query('SELECT * FROM film WHERE film_id = $1', [id]);
        // if (existingFilm.rows.length === 0) {
        //     return res.status(404).json({ message: 'Película no encontrada' });
        // }

        const result = await client.query(
            'UPDATE film SET title = $1, description = $2, release_year = $3, language_id = $4, rental_duration = $5, rental_rate = $6, length = $7, replacement_cost = $8 WHERE film_id = $9 RETURNING *',
            [title, description, release_year, language_id, rental_duration, rental_rate, length, replacement_cost, id]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
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
