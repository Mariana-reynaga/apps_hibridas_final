// Chalk
const chalk = require('chalk');
const log = console.log;

    // Primera importación de datos
    
    // const fs = require('fs');

    // const Cats = require('./Models/CatsModel');

    // const importarDB = async () => {
    //     try {
    //         const catsData = JSON.parse(fs.readFileSync('./data/cats_data.json', 'utf-8'));

    //         await Cats.deleteMany();
    //         await Cats.create(catsData);

    //     } catch (error) {
    //         log(chalk.bgRed('[main.js]: importarDB: ' ,error));
    //         res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    //     }
    // };

    // importarDB();

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
    origin: 'https://michirest.netlify.app'
}))


// Ruta raiz
app.get('/apiFinal', (req, res)=>{ 
    res.status(200).send("<h1>API REST michis</h1>");
});

routerAPI(app);

app.listen(port, ()=>{
    log(chalk.white.bgBlue("Conexión establecida, el puerto es: ", port));
});