// Chalk
const chalk = require('chalk');
const log = console.log;

// Express
const express = require('express');
const app = express();
app.use(express.json());

// cookies
const cookies = require('cookie-parser');
app.use(cookies());

// Dotenv
require('dotenv').config();
const port = process.env.PORT;

// Router
const routerAPI = require('./Routes');

// Connexión a database
const db = require('./config/database');

app.use( (req, res, next)=>{
    next();
});

app.use( express.static('public') );

// Conexión con usos externos
const cors = require('cors');
app.use( cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))

    // descomentar esto si es para testear en serividor
// app.use( cors())

// Ruta raiz
app.get('/apiFinal', (req, res)=>{ 
    res.status(200).send("<h1>API REST michis</h1>");
});

routerAPI(app);

app.listen(port, ()=>{
    log(chalk.white.bgBlue("Conexión establecida, el puerto es: ", port));
});