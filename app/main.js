// app.js
const express = require('express');
const app = express();
const welcomeRoute = require('./rutas/welcome.js');
const filmRoute = require('./rutas/films.js');

app.use(express.json());
app.use('/films', filmRoute)
app.use('/', welcomeRoute);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
