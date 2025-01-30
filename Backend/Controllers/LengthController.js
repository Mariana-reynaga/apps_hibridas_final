// Chalk
const chalk = require('chalk');
const log = console.log;

const Length = require('../Models/LengthModel');

const getLength = async( req, res )=>{
    const lengths = await Length.find();
    try {
        if (lengths.length == 0) {
            res.status(404).json( { msg: "No existen largos."} );
    
        }else {
            res.status(200).json( { msg: "Largos: ", data: lengths } );
        }
    } catch (error) {
        log(chalk.bgRed('[LengthController.js]: getLength: ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }
}

const createLength = async( req, res )=>{
    const { name } = req.body;

    if ( !name ) {
        res.status(400).json({msg: 'Faltan datos obligatorios', data: { name }});
    };
    
    try {
        if( name < 4){
            res.status(400).json({msg: 'El largo debe tener un minimo de 4 letras.', data: { name }});
        }

        const lengthCheck = await Length.exists( { name } );

        if (lengthCheck) {
            return res.status(400).send({ msg: "El largo ya existe." });
        }

        const newLength = new Length( { name } );
            
        await newLength.save();

        res.status(200).json( { msg: "Largo creado.", data: newLength } );

    } catch (error) {
        log(chalk.bgRed('[LengthController.js]: createLength: ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }
}

const deleteLength = async( req, res )=>{
    const { id } = req.params;

    try {
        const length = await Length.findByIdAndDelete(id);

        if (length) {
            res.status(200).json({msg: "El largo fue eliminado exitosamente.", data: length});

        }else{
            res.status(404).json({msg: "No se encontro el largo.", data: {}});
        }
    } catch (error) {
        log(chalk.bgRed('[LengthController.js]: deleteLength: ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }
}

module.exports = { getLength, createLength, deleteLength };