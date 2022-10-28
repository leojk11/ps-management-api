const express = require('express');
const mainRouter = express();

const consolesRoutes = require('../routes/consoles');
const settingsRoutes = require('../routes/settings');
const revenueRoutes = require('../routes/revenue');
const gamesRoutes = require('../routes/games');

mainRouter.use('/consoles', consolesRoutes);
mainRouter.use('/settings', settingsRoutes);
mainRouter.use('/revenue', revenueRoutes);
mainRouter.use('/games', gamesRoutes);

module.exports = mainRouter;