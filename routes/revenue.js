const express = require('express');
const router = express.Router();

const revenue = require('../controllers/revenue');

router.get('/', revenue.getAll);
// router.get('/:id', revenue.getSingle);
router.get('/revenue/:day/:month/:year', revenue.getTotalInfo);

// drink revenues
router.get('/drinks/all', revenue.getAllDrinksRevenue);
router.get('/revenue/drink/:day/:month/:year', revenue.getTotalDrinkRevenueInfo);

module.exports = router;