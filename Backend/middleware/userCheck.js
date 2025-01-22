// Chalk
const chalk = require('chalk');
const log = console.log;

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
require('dotenv').config();
const secretKey = process.env.SECRETKEY; 

const userCheck = (req, res, next) => {
    const token = req.cookies["access_token"];

    const { id } = req.params;

    try {
        const validToken = jwt.verify(token, secretKey);

        if(validToken.userID === id ){
            next();
        }else{
            res.status(403).json({msg: 'No se pueden editar detalles de usuarios otros al propio.'});
        }

    } catch (error) {
        log(chalk.bgRed('[Middleware][userCheck.js] = ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }
}

module.exports = userCheck;