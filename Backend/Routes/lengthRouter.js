const express = require('express');
const router = express.Router();
router.use(express.json());

const validateToken = require('../middleware/auth');
const adminCheck = require('../middleware/adminCheck');

const { getLength, createLength, deleteLength } = require('../Controllers/LengthController');

router.get('/', getLength);

router.post('/', validateToken, adminCheck, createLength);

router.delete('/delete/:id',validateToken, adminCheck, deleteLength);

module.exports = router;