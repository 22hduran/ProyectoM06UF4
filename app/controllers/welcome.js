const { Client } = require('pg');
const express = require('express');
const path = require('path');
const router = express.Router();
const db = require('../database/dbconfig');

const client = new Client(db);
client.connect();

router.use(express.static(path.join(__dirname, '../AdminLTE-3.2.0')));

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../AdminLTE-3.2.0/index.html'));
});

module.exports = router;


// PUT /films/:id
// router.put('/films/:id', async (req, res) => {
//     const { id } = req.params;
//     const { title, director, year, rating } = req.body;
//     try {
//         const result = await client.query(
//             'UPDATE films SET title = $2, director = $3, year = $4, rating = $5 WHERE id = $1 RETURNING *',
//             [id, title, director, year, rating]
//         );
//         res.json(result.rows[0]);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });
