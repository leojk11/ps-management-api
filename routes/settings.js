const express = require('express');
const router = express.Router();

const settings = require('../controllers/settings');

router.get('/', settings.getAll);

router.post('/', settings.add);

router.patch('/', settings.edit);

module.exports = router;