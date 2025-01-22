const express = require('express');
const router = express.Router();
router.use(express.json());

const validateToken = require('../middleware/auth');
const adminCheck = require('../middleware/adminCheck');

const { getColors, createColor } = require('../Controllers/ColorController');

router.get('/', getColors);

router.post('/', validateToken, adminCheck,createColor);

module.exports = router;