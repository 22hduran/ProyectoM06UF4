const express = require("express");
const app = express();

const { Client } = require('pg');

const connectionData = {

  user: 'postgres',

  host: 'localhost',

  database: 'Sakila',

  password: '',

  port: 5432,

}

const client = new Client(connectionData);

client.connect()
  .then(() => {
    console.log("Conexión exitosa a PostgreSQL");
    // Realiza cualquier otra operación que necesites aquí
  })
  .catch(err => {
    console.error("Error al conectar a PostgreSQL:", err);
  });
