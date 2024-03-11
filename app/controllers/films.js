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
