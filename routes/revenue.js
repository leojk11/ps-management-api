const express = require('express');
const router = express.Router();

const revenue = require('../controllers/revenue');

router.get('/', revenue.getAll);
router.get('/:id', revenue.getSingle);
router.get('/revenue/:day/:year', revenue.getTotalInfo);


module.exports = router;