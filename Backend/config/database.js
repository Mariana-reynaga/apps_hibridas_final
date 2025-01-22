// Chalk
const chalk = require('chalk');
const log = console.log;

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.CONNECTION);
const db = mongoose.connection;

db.on('error', ()=> log(chalk.white.bgRed('Error')));

db.once('open', ()=>{
    log(chalk.cyan.bgWhite('Conexión correcta'));
});

module.exports = db;