const express = require('express');
const router = express.Router();
router.use(express.json());

const validateToken = require('../middleware/auth');
const adminCheck = require('../middleware/adminCheck');

const { getLength, createLength, getLengthXid, deleteLength } = require('../Controllers/LengthController');

router.get('/', getLength);

router.get('/find/:id', getLengthXid);

router.post('/', validateToken, adminCheck, createLength);

router.delete('/delete/:id',validateToken, adminCheck, deleteLength);

module.exports = router;