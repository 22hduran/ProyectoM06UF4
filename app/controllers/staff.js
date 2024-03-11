const express = require('express');
const router = express.Router();
const { Client } = require('pg');
const db = require('../database/dbconfig');


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

module.exports = router;
///staff?skip=50&take=50