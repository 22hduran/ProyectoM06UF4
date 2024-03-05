// const express = require('express');
// const router = express.Router();
// const { Client } = require('pg');
// const db = require('../database/dbconfig');

// const client = new Client(db);
// client.connect();

// router.post('/', async (req, res) => {
//     try {
//         const {
//             film_id,
//             title,
//             description,
//             release_year,
//             language_id,
//             original_language_id,
//             rental_duration,
//             rental_rate,
//             length,
//             replacement_cost,
//             rating,
//             last_update,
//             special_features,
//             fulltext
//         } = req.body;

//         const queryText = `
//             INSERT INTO film (film_id, title, description, release_year, language_id, original_language_id, 
//                 rental_duration, rental_rate, length, replacement_cost, rating, last_update, special_features, fulltext) 
//             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
//         `;
        
//         await client.query(queryText, [
//             film_id,
//             title,
//             description,
//             release_year,
//             language_id,
//             original_language_id,
//             rental_duration,
//             rental_rate,
//             length,
//             replacement_cost,
//             rating,
//             last_update,
//             special_features,
//             fulltext
//         ]);

//         res.status(200).json({ message: 'Data inserted successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// module.exports = router;
