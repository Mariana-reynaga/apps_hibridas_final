// Chalk
const chalk = require('chalk');
const log = console.log;

const mongoose = require('mongoose');

const isImageURL = require('image-url-validator').default;

const Cats = require('../Models/CatsModel');
const Colors = require('../Models/ColorsModel');
const Length = require('../Models/LengthModel');
const Status = require('../Models/StatusModel');

// Traer todas las razas experimentales
const getBreeds = async ( req, res ) => {
    const breeds = await Cats.find();

    try {
        if (breeds.length == 0) {
            res.status(404).json( { msg: "No existen razas."} );
    
        }else {
            res.status(200).json( { msg: "Razas: ", data: breeds } );
        }

    } catch (error) {
        log(chalk.bgRed('[CatsController.js]: getBreeds: ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }
}

// Traer una raza experimental por nombre
const getBreedXname = async ( req, res ) => {
    const {name} = req.params;

    try{
        const query = Cats.where({name: name});

        const breedName = await query.findOne();

        if (breedName) {
            res.status(200).json({msg: "¡Raza encontrada!", data: breedName});

        } else {
            res.status(404).json({msg: "No se encontro la raza.", data: {}});
        }

    }catch(error){
        log(chalk.bgRed('[CatsController.js]: getBreedXname: ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }
};

// Traer una raza por largo de pelo
const getBreedXlength = async ( req, res )=>{
    const { length } = req.params;

    const possible_lengths = Cats.schema.path('coat_length').enumValues;

    try {
        if ( !possible_lengths.includes(length) ) {
            res.status(400).json({msg: "Largo de pelo no valido.", data: {}});

        }else{
            const query = Cats.where({coat_length: length});
    
            const allLengths = await query.find();
    
            if (allLengths.length !== 0) {
                res.status(200).json({msg: "¡Raza encontradas!", data: allLengths});
    
            } else {
                res.status(404).json({msg: "No se encontron razas con ese largo de pelo.", data: {}});
            }
        }

    } catch (error) {
        log(chalk.bgRed('[CatsController.js]: getBreedXlength: ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }
};

// Traer una raza por ID
const getBreedXid = async ( req, res ) => {
    const {id} = req.params; 

    try {
        const breed = await Cats.findById(id);

        if (breed) {
            res.status(200).json({msg: "¡Raza encontrada!", data: breed});

        }else{
            res.status(404).json({msg: "No se encontro la raza.", data: {}});
        }
    } catch (error) {
        log(chalk.bgRed('[CatsController.js]: getBreedXid: ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }
};

// Traer 3 razas al azar
const threeRandomBreed = async (req, res) => {
    try{
        let randoms = await Cats.aggregate([{$sample: {size: 3}}]);

        res.status(200).json({msg: "Razas random elegidas: ",data: randoms});

    }catch(error){
        log(chalk.bgRed('[CatsController.js]: threeRandomBreed: ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }
}

// Añadir una nueva raza
const createCat = async ( req, res ) =>{
    const { name, origin, coat_length, status, color } = req.body;

    if ( !name || !origin || !coat_length || !status || !color ) {
        res.status(400).json({msg: 'Faltan datos obligatorios.', data: { name, origin, coat_length, status, color }});
    };

    if( !mongoose.isValidObjectId(color) && !mongoose.isValidObjectId(status) && !mongoose.isValidObjectId(coat_length) ){
        res.status(400).json({msg: 'El color, status y largo de pelo tiene que ser un ObjectID.', data: { color, status, coat_length }});
        
    }else{
        try {
            const colorGato     = await Colors.findById(color)
            const lengthGato    = await Length.findById(coat_length)
            const statusGato    = await Status.findById(status)

            if (colorGato && lengthGato && statusGato) {

                const breedExist = await Cats.exists({ name });
                
                if (breedExist){
                    return res.status(400).send({ msg: "La raza ya existe." });
                }
                
                if(name.length < 4){
                    return res.status(400).send({msg: "El nombre no puede tener menos de 4 caracteres."});
                }

                if(origin.length < 4){
                    return res.status(400).send({msg: "El lugar de origen no puede tener menos de 4 caracteres."});
                }

                const newBreed = new Cats( { 
                    name, 
                    origin, 
                    coat_length: lengthGato._id, 
                    status: statusGato._id, 
                    color: colorGato._id
                } );
                
                await newBreed.save();
    
                res.status(200).json( { msg: "Raza Creada.", data: newBreed } );

            } else {
                res.status(400).json({
                    msg: 'Algo ocurrio con color, largo o estado.'
                });
            }

        } catch (error) {
            log(chalk.bgRed('[CatsController.js]: createCat: ' ,error));
            res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
        }

    }
}

// Editar una raza
const editCat = async ( req, res ) =>{
    const { id } = req.params;

    const { name, origin, coat_length, status, color, img_url } = req.body;

    if ( !name || !origin || !coat_length || !status || !color ) {
        res.status(400).json({msg: 'Faltan datos obligatorios.', data: { 
            name, 
            origin, 
            coat_length, 
            status, 
            color
        }});
    };

    if( 
        !mongoose.isValidObjectId(color) && 
        !mongoose.isValidObjectId(status) && 
        !mongoose.isValidObjectId(coat_length) 
    ){
        res.status(400).json({
            msg: 'El color, status y largo de pelo tiene que ser un ObjectID.', 
            data: { color, status, coat_length }});

    }else{
        const colorGato     = await Colors.findById(color);
        const lengthGato    = await Length.findById(coat_length)
        const statusGato    = await Status.findById(status)

        let imgCheck = await isImageURL(img_url);

        let newData = { 
            name, 
            origin, 
            coat_length: lengthGato._id, 
            status: statusGato._id, 
            color: colorGato._id,
            img_url
        };

        if(!imgCheck || img_url.length == 0){
            newData = { 
                name, 
                origin, 
                coat_length: lengthGato._id, 
                status: statusGato._id, 
                color: colorGato._id,
                img_url: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
            };

            log('el url no era valido, asi que lo remplazamos!');
        }

        try {
            const breed = await Cats.findById(id);
    
            if (breed) {
                if(colorGato && lengthGato && statusGato){

                    if(name.length < 4){
                        return res.status(400).send({msg: "El nombre no puede tener menos de 4 caracteres."});
                    }

                    if(origin.length < 4){
                        return res.status(400).send({msg: "El lugar de origen no puede tener menos de 4 caracteres."});
                    }

                    const newBreed = await Cats.findByIdAndUpdate(id, newData, {new: true});
            
                    res.status(200).json({
                    msg: "La raza fue actualizada exitosamente.", data: newBreed});

                }else{
                    res.status(400).json({
                        msg: 'Algo ocurrio con color, largo o estado.'
                    });
                }

            }else{
                res.status(404).json({msg: "No se encontro la raza", data: {}});
            }
        } catch (error) {
            log(chalk.bgRed('[CatsController.js]: editCat: ' ,error));
            res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
        }
        
    }
}

// Eliminar una raza
const deleteCat = async (req, res) =>{
    const { id } = req.params;

    try {
        const breed = await Cats.findByIdAndDelete(id);

        if (breed) {
            res.status(200).json({msg: "La raza fue eliminada exitosamente.", data: breed});

        }else{
            res.status(404).json({msg: "No se encontro la raza.", data: {}});
        }
    } catch (error) {
        log(chalk.bgRed('[CatsController.js]: deleteCat: ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }
}

module.exports = { 
    getBreeds, 
    getBreedXid, 
    getBreedXname, 
    getBreedXlength,  
    createCat,
    editCat,
    deleteCat,
    threeRandomBreed 
};