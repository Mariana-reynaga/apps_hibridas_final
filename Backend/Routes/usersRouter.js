const express = require('express');
const router = express.Router();
router.use(express.json());

// Middleware
const validateToken = require('../middleware/auth');
const adminCheck = require('../middleware/adminCheck');
const userCheck = require('../middleware/userCheck');

const { 
    bringUsers, 
    getUserXname,
    getUserXid,
    createUser, 
    updateUser,
    deleteUser, 
    login,
    logout,
    createAdmin,
    demoteAdmin,
    loginCheck,
    checkIfAdmin
} = require('../Controllers/UserController');

// Rutas
router.get('/', validateToken, bringUsers);

router.get('/name/:name', getUserXname);

router.get('/:id', getUserXid);

router.post('/', createUser);

router.put('/:id',validateToken, userCheck, updateUser);

router.delete('/:id',validateToken, deleteUser); 

router.post('/login', login);

router.get('/logout/logout', logout);

router.put('/makeAdmin/:id', validateToken, adminCheck, createAdmin);

router.put('/demoteAdmin/:id', validateToken, adminCheck, demoteAdmin);

router.get('/check/loginCheck', validateToken ,loginCheck);

router.get('/check/checkIfAdmin', validateToken , adminCheck, checkIfAdmin);

module.exports = router;