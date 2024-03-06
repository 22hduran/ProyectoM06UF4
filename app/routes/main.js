// app.js
const express = require('express');
const app = express();
const welcomeRoute = require('../controllers/welcome.js');
const filmRoute = require('../controllers/films.js');
const customerRoute = require('../controllers/customers.js');

app.use(express.json());
app.use('/', welcomeRoute);
app.use('/films', filmRoute)
app.use('/customers', customerRoute)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
