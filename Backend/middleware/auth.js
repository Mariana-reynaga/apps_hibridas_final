// Chalk
const chalk = require('chalk');
const log = console.log;

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
require('dotenv').config();
const secretKey = process.env.SECRETKEY; 

const validateToken = ( req, res, next )=>{
    const auth = req.cookies["access_token"];

    if (!auth) {
        res.status(401).json({msg: "El token no puede faltar."});
        return
    }

    try {
        const validToken = jwt.verify(auth, secretKey);

        if(validToken){
            next();
        }else{
            return res.status(403).json({msg: 'Token invalido.'});
        }

    } catch (error) {
        log(chalk.bgRed('[Middleware][auth.js]: validateToken: ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }
}

module.exports = validateToken;