const express = require('express');
const router = express.Router();
const { Client } = require('pg');
const db = require('../database/dbconfig');

const client = new Client(db);

router.get('/', async (req, res) => {
    try {
        await client.connect();
        const result = await client.query('SELECT * FROM film');
        
        const films = result.rows;
        res.json(films);
        // console.log(films);
        // let tableHTML = '<table id="filmsTable" border="1"><tr>';
        // for (const column in films[0]) {
        //     tableHTML += `<th>${column}</th>`;
        // }
        // tableHTML += '</tr>';
        // for (const film of films) {
        //     tableHTML += '<tr>';
        //     for (const column in film) {
        //         tableHTML += `<td>${film[column]}</td>`;
        //     }
        //     tableHTML += '</tr>';
        // }
        // tableHTML += '</table>';

        // tableHTML += `<style>
        //     #filmsTable {
        //         border-collapse: collapse;
        //         width: 100%;
        //     }
        //     #filmsTable th, #filmsTable td {
        //         padding: 8px;
        //         text-align: left;
        //     }
        //     #filmsTable tr:nth-child(even) {
        //         background-color: #f2f2f2;
        //     }
        //     #filmsTable th {
        //         background-color: #4CAF50;
        //         color: white;
        //     }
        // </style>`;

        // res.send(tableHTML);
      
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        await client.end();
    }
});

module.exports = router;
