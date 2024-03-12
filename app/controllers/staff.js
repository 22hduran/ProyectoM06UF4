const express = require('express');
const router = express.Router();
const { Client } = require('pg');
const db = require('../database/dbconfig');

router.use(express.urlencoded({ extended: true }));

router.get('/', async (req, res) => {
    const client = new Client(db); 
    try {
        client.connect();
        const result = await client.query('SELECT * FROM staff');
        
        const staff = result.rows;
        res.json(staff);
      
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        res.on('finish', () => {
            client.end();
        });
    }
});

router.post('/crear', async (req, res) => {
    const { first_name, last_name, address_id, email, store_id, active, username, password } = req.body;
    console.log(req.body);
    

    const client = new Client(db);
    try {
        await client.connect();
        const result = await client.query('INSERT INTO staff (first_name, last_name, address_id, email, store_id, active, username, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [first_name, last_name, address_id, email, store_id, active, username, password]);
        console.log('new film: ' + result.json());

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar la película' });
    } finally {
        client.end();
    }
});


module.exports = router;
///staff?skip=50&take=50