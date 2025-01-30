const express = require('express');
const router = express.Router();
router.use(express.json());

const validateToken = require('../middleware/auth');
const adminCheck = require('../middleware/adminCheck');

const { getColors, createColor, deleteColor } = require('../Controllers/ColorController');

router.get('/', getColors);

router.post('/', validateToken, adminCheck,createColor);

router.delete('/delete/:id', validateToken, adminCheck, deleteColor);

module.exports = router;