const express = require('express');
const router = express.Router();
router.use(express.json());

const validateToken = require('../middleware/auth');
const adminCheck = require('../middleware/adminCheck');

const { getStatus, createStatus, deleteStatus } = require('../Controllers/StatusController');

router.get('/', getStatus);

router.post('/', validateToken, adminCheck, createStatus);

router.delete('/delete/:id',validateToken, adminCheck, deleteStatus);

module.exports = router;