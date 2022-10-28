const express = require('express');
const router = express.Router();

const games = require('../controllers/games');

router.get('/', games.getAll);
router.get('/:id', games.getSingle);

router.post('/', games.addNew);

router.patch('/:id', games.edit);

router.delete('/:id', games.delete);

module.exports = router;