const express = require('express');
const router = express.Router();
const { Client } = require('pg');
const db = require('../database/dbconfig');

const client = new Client(db);

router.get('/', async (req, res) => {
    try {
        await client.connect();
        const result = await client.query('SELECT * FROM customer');
        
        const customers = result.rows;
        res.json(customers);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        await client.end();
    }
});

module.exports = router;
