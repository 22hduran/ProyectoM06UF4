const express = require("express");
const app = express();

const { Client } = require('pg');

const connectionData = {

  user: 'user',

  host: '',

  database: '',

  password: 'mysecretpassword',

  port: 5432,

}

const client = new Client(connectionData)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});
