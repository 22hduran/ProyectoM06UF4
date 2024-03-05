const {Client} = require('pg');
const express = require('express');
const router = express.Router();
const db = require('../database/dbconfig');

const client = new Client(db);
client.connect()

router.get('/', (req, res) => {
    res.send('Welcome to the Sakila API!');
});

module.exports = router;

// POST /films
// router.post('/films', async (req, res) => {
//     const { title, director, year, rating } = req.body;
//     try {
//         const result = await client.query(
//             'INSERT INTO films (title, director, year, rating) VALUES ($1, $2, $3, $4) RETURNING *',
//             [title, director, year, rating]
//         );
//         res.status(201).json(result.rows[0]);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

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

// DELETE /films/:id
// router.delete('/films/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const result = await client.query('DELETE FROM films WHERE id = $1 RETURNING *', [id]);
//         res.json(result.rows[0]);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });
