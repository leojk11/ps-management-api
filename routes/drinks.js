const express = require('express');
const router = express.Router();

const drinks = require('../controllers/drinks');

router.get('/', drinks.getAll);
router.get('/:id', drinks.getSingle);

router.post('/', drinks.add);

router.patch('/:id', drinks.edit);
router.patch('/:id/sell', drinks.sell);

router.delete('/:id', drinks.delete);

module.exports = router;