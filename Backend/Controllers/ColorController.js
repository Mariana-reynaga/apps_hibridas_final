// Chalk
const chalk = require('chalk');
const log = console.log;

const Colors = require('../Models/ColorsModel');

const getColors = async( req, res )=>{
    const colors = await Colors.find();

    try {
        if (colors.length == 0) {
            res.status(404).json( { msg: "No existen colores."} );
    
        }else {
            res.status(200).json( { msg: "Colores: ", data: colors } );
        }

    } catch (error) {
        log(chalk.bgRed('[ColorsController.js]: getColors: ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }
}

const createColor = async( req, res )=>{
    const { name } = req.body;

    if ( !name ) {
        res.status(400).json({msg: 'Faltan datos obligatorios', data: { name }});
    };
    
    try {
        if( name < 4){
            res.status(400).json({msg: 'El color debe tener un minimo de 4 letras.', data: { name }});
        }

        const colorCheck = await Colors.exists( { name } );

        if (colorCheck) {
            return res.status(400).send({ msg: "El color ya existe." });
        }

        const newColor = new Colors( { name } );
            
        await newColor.save();

        res.status(200).json( { msg: "Color creado.", data: newColor } );

    } catch (error) {
        log(chalk.bgRed('[ColorController.js]: createColor: ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }
}

module.exports = { getColors, createColor };