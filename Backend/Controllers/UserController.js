// Chalk
const chalk = require('chalk');
const log = console.log;

const User = require('../Models/UsersModel');

// Encryption
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = process.env.SECRETKEY; 
const salt = 10;


// Traer Todos Los Usuarios
const bringUsers = async ( req, res ) => {
    const users = await User.find();

    try {
        if (users.length == 0) {
            log(chalk.blue("No hay usuarios"))
            res.status(404).json( { msg: "No existen Usuarios"} );
    
        }else {
            res.status(200).json( { msg: "Usuarios: ", users: users } );
        }

    } catch (error) {
        log(chalk.bgRed('[UserController.js]: bringUsers: ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', users: {}});
    }

};

// Traer un Usuario por nombre
const getUserXname = async ( req, res ) => {
    const {name} = req.params;

    try{
        const query = User.where({name: name});

        const userName = await query.findOne();

        if (userName) {
            res.status(200).json({msg: "¡Usuario encontrado!", data: userName});

        } else {
            res.status(404).json({msg: "No se encontro el usuario.", data: {}});
        }

    }catch(error){
        log(chalk.bgRed('[UserController.js]: getUserXname: ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }
};

// Traer un Usuario por ID
const getUserXid = async ( req, res ) => {
    const {id} = req.params; 
    
    try {
        const user = await User.findById(id);

        if (user) {
            res.status(200).json({msg: "¡Usuario encontrado!", data: user});

        }else{
            res.status(404).json({msg: "No se encontro el usuario.", data: {}});
        }
    } catch (error) {
        log(chalk.bgRed('[UserController.js]: getUserXid: ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }
};

// Crear un usuario
const createUser = async ( req, res ) =>{
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
        res.status(400).json({msg: 'Faltan datos obligatorios', data: { name , email , password }});
    }else{

        const passwordHash = await bcrypt.hash(password, salt);
        
        try {
            
            if (password.length >= 8 && email.indexOf('@') > -1 ) {

                const userExist = await User.exists({ email });

                if (userExist){
                    return res.status(400).send({ msg: "El usuario ya existe." });
                }
            
                const newUser = new User( { name, email, password: passwordHash } );
                
                await newUser.save();

                res.status(200).json( { msg: "Usuario Creado", data: newUser } );

            } else {
                res.status(400).json({msg: 'Datos incorrectos. La contraseña debe ser al menos 8 caracteres y el email debe contener un @.', data: { email, password }});
            }
            
        } catch (error) {
            log(chalk.bgRed('[UserController.js]: createUser: ' ,error));
            res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
        }

    };
};

// Crear un admin
const createAdmin = async ( req, res ) =>{
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (user) {       
            if (user.role === "admin") {
                res.status(400).json({msg: "El usuario ya es administrador."});
            }else{
                const updatedUser = await User.findByIdAndUpdate(id, {role: "admin"}, {new: true});
    
                res.status(200).json({msg: "El usuario ahora es administrador", data: updatedUser});
            }

        } else {
            res.status(404).json({msg: "El usuario no existe."});
        }

    } catch (error) {
        log(chalk.bgRed('[UserController.js]: login: ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }
}

// Actualizar un Usuario
const updateUser = async ( req, res ) =>{
    const { id } = req.params;
    const { name, password, email } = req.body;

    const passwordHash = await bcrypt.hash(password, salt);

    const newData = {name, password: passwordHash, email};
    
    try {
        const user = await User.findById(id);

        if(!newData.name || !newData.email || !newData.password){
            res.status(400).json({msg: 'Los datos no pueden faltar.', data:{newData}});

        }else if (user) {
            if (password.length >= 8 && email.indexOf('@') > -1 ) {
                
                const updatedUser = await User.findByIdAndUpdate(id, newData, {new: true});
    
                res.status(200).json({msg: "El usuario fue actualizado exitosamente.", data: updatedUser});

            }else {
                res.status(400).json({msg: 'Datos incorrectos. La contraseña debe ser al menos 8 caracteres y el email debe contener un @.', data: { email, password }});
            }

        }else{
            res.status(404).json({msg: "No se encontro el usuario", data: {}});
        }
    } catch (error) {
        log(chalk.bgRed('[UserController.js]: updateUser: ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }
};

// Eliminar un Usuario
const deleteUser = async ( req, res ) =>{
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);

        if (user) {
            res.status(200).json({msg: "El usuario fue eliminado exitosamente.", data: user});

        }else{
            res.status(404).json({msg: "No se encontro el usuario.", data: {}});
        }
    } catch (error) {
        log(chalk.bgRed('[UserController.js]: deleteUser: ' , error));
        res.status(500).json({msg: 'OOPS, tenemos un error.', data: {}});
    }
};

const login = async (req, res)=>{
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if(user){
            const validPassword = await bcrypt.compare( password, user.password );

            if(validPassword){
                const data = {
                    userID: user._id,
                    username: user.name,
                    role: user.role
                };
    
                const token = jwt.sign(data, secretKey, {expiresIn: '24h'});
                
                res.cookie('access_token', token, { maxAge: 8.64e+7, httpOnly: true });

                res.status(200).json({msg: `Bienvenido ${user.name}`, data:{ data, token } });
                
            }else{
                res.status(401).json({msg: "El password es incorrecto", data: {}});
            }
            
        }else{
            res.status(401).json({msg: "El email no existe", data: {}});
        }

    } catch (error) {
        log(chalk.bgRed('[UserController.js]: login: ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }
}

module.exports = { bringUsers, getUserXname, getUserXid, createUser, updateUser, deleteUser, login, createAdmin };