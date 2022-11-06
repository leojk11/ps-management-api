const express = require('express');
const mainRouter = express();

const consolesRoutes = require('../routes/consoles');
const settingsRoutes = require('../routes/settings');
const revenueRoutes = require('../routes/revenue');
const gamesRoutes = require('../routes/games');
const drinksRoutes = require('../routes/drinks');

mainRouter.use('/consoles', consolesRoutes);
mainRouter.use('/settings', settingsRoutes);
mainRouter.use('/revenue', revenueRoutes);
mainRouter.use('/games', gamesRoutes);
mainRouter.use('/drinks', drinksRoutes);

module.exports = mainRouter;