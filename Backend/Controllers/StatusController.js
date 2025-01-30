// Chalk
const chalk = require('chalk');
const log = console.log;

const Status = require('../Models/StatusModel');

const getStatus = async( req, res )=>{
    const status = await Status.find();

    try {
        if (status.length == 0) {
            res.status(404).json( { msg: "No existen estados."} );
    
        }else {
            res.status(200).json( { msg: "Estados: ", data: status } );
        }

    } catch (error) {
        log(chalk.bgRed('[StatusController.js]: getStatus: ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }
}

const createStatus = async( req, res )=>{
    const { name } = req.body;

    if ( !name ) {
        res.status(400).json({msg: 'Faltan datos obligatorios', data: { name }});
    };
    
    try {
        if( name < 4){
            res.status(400).json({msg: 'El estado debe tener un minimo de 4 letras.', data: { name }});
        }

        const statusCheck = await Status.exists( { name } );

        if (statusCheck) {
            return res.status(400).send({ msg: "El estado ya existe." });
        }

        const newStatus = new Status( { name } );
            
        await newStatus.save();

        res.status(200).json( { msg: "Estado creado.", data: newStatus } );

    } catch (error) {
        log(chalk.bgRed('[StatusController.js]: createStatus: ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }
}

const deleteStatus = async( req, res )=>{
    const { id } = req.params;

    try {
        const status = await Status.findByIdAndDelete(id);

        if (status) {
            res.status(200).json({msg: "El estado fue eliminado exitosamente.", data: status});

        }else{
            res.status(404).json({msg: "No se encontro el estado.", data: {}});
        }
    } catch (error) {
        log(chalk.bgRed('[StatusController.js]: deleteStatus: ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }
}

module.exports = { getStatus, createStatus, deleteStatus };