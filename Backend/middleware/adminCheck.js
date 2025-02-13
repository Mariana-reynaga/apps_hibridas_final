// Chalk
const chalk = require('chalk');
const log = console.log;

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
require('dotenv').config();
const secretKey = process.env.SECRETKEY; 

const adminCheck = (req, res, next) => {
    const token = req.cookies["access_token"];

    try {
        const validToken = jwt.verify(token, secretKey);

        log(validToken.role);

        if(validToken.role === 'admin'){
            next();
        }else{
            res.status(403).json({msg: 'El usuario no tiene derecho de admin'});
        }

    } catch (error) {
        log(chalk.bgRed('[Middleware][adminCheck.js]: adminCheck = ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }
}

module.exports = adminCheck;