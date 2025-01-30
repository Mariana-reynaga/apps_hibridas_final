const express = require('express');
const router = express.Router();
router.use(express.json());

// Middleware
const validateToken = require('../middleware/auth');
const adminCheck = require('../middleware/adminCheck');
const userCheck = require('../middleware/userCheck');

const { bringUsers, getUserXname, getUserXid, createUser, updateUser, deleteUser, login, createAdmin, loginCheck } = require('../Controllers/UserController');

// Rutas
router.get('/', bringUsers);

router.get('/name/:name', getUserXname);

router.get('/:id', getUserXid);

router.post('/', createUser);

router.put('/:id',validateToken, userCheck , updateUser);

router.delete('/:id',validateToken, deleteUser); 

router.post('/login', login); 

router.put('/admin/:id',validateToken, adminCheck, createAdmin);

router.get('/check/loginCheck', validateToken ,loginCheck);

module.exports = router;