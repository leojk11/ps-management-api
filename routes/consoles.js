const express = require('express');
const router = express.Router();

const consoles = require('../controllers/consoles');

router.get('/', consoles.getAll);
router.get('/:id', consoles.getSingle);

router.post('/', consoles.addNew);

router.patch('/:id', consoles.edit);
router.patch('/:id/start', consoles.startPlaying);
router.patch('/:id/stop', consoles.stopPlaying);

router.delete('/:id', consoles.delete);

module.exports = router;