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
        
        const result = await client.query(`SELECT * FROM customer LIMIT ${take} OFFSET ${skip}`);

        const customers = result.rows;
        res.json(customers);
      
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        client.end();
    }
});

router.post('/crear', async (req, res) => {
    const { store_id, first_name, last_name, email, address_id } = req.body;

    const client = new Client(db);
    try {
        await client.connect();
        const result = await client.query(
            'INSERT INTO customer (store_id, first_name, last_name, email, address_id) VALUES ($1, $2, $3, $4, $5) RETURNING *', 
            [store_id, first_name, last_name, email, address_id]
        );

        const newCustomer = result.rows[0]; // Access the first row of the result

        console.log('new customer:', newCustomer);
        res.status(201).json(newCustomer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar el cliente' });
    } finally {
        client.end();
    }
});



router.get('/addresses', async (req, res) => {
    const client = new Client(db); 
    try {
        client.connect();
        
        const result = await client.query('SELECT address_id FROM address');
        const addresses = result.rows.map(row => row.address_id);
        
        res.json(addresses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        client.end();
    }
});

module.exports = router;
