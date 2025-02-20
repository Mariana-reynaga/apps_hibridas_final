// Chalk
const chalk = require('chalk');
const log = console.log;

const Cats = require('../Models/CatsModel');
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

const getColorXid = async( req, res )=>{
    const {id} = req.params;

    try {
        const color = await Colors.findById(id);

        if (color) {
            res.status(200).json({msg: "¡Color encontrado!", data: color});

        }else{
            res.status(404).json({msg: "No se encontro el color.", data: {}});
        }
    } catch (error) {
        log(chalk.bgRed('[colorController.js]: getColorXid: ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }
}

const createColor = async( req, res )=>{
    const { name } = req.body;

    if ( !name ) {
        return res.status(400).json({msg: 'Faltan datos obligatorios', data: { name }});
    };

    try {
        if( name.length < 4){
            return res.status(400).json({msg: 'El color debe tener un minimo de 4 letras.', data: { name }});
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

const deleteColor = async( req, res )=>{
    const { id } = req.params;

    try {
        const graveyard = await Cats.deleteMany({color: id})

        const color = await Colors.findByIdAndDelete(id);

        if (color) {
            res.status(200).json({msg: "El color fue eliminado exitosamente.", data: color});

        }else{
            res.status(404).json({msg: "No se encontro el color.", data: {}});
        }
    } catch (error) {
        log(chalk.bgRed('[ColorController.js]: deleteColor: ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }
}

module.exports = { getColors, getColorXid ,createColor, deleteColor };