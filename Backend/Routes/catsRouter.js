const express = require('express');
const router = express.Router();
router.use(express.json());

const validateToken = require('../middleware/auth');
const adminCheck = require('../middleware/adminCheck');

const { 
    getBreeds, 
    getBreedXid,
    getBreedXidEdit,
    getBreedXname, 
    getBreedXlength,  
    createCat,
    editCat,
    deleteCat,
    threeRandomBreed,
} = require('../Controllers/CatsController');

// Rutas
router.get('/', getBreeds);

router.get('/find/:id', getBreedXid);

router.get('/findXedit/:id', getBreedXidEdit);

router.get('/name/:name', getBreedXname);

router.get('/length/:length', getBreedXlength);

router.post('/', validateToken, adminCheck, createCat);

router.put('/find/:id', validateToken, adminCheck ,editCat);

router.delete('/delete/:id', validateToken, adminCheck, deleteCat);

router.get('/3random', threeRandomBreed);

module.exports = router;