const express = require('express');
const mainRouter = express();

const consolesRoutes = require('../routes/consoles');
const settingsRoutes = require('../routes/settings');

mainRouter.use('/consoles', consolesRoutes);
mainRouter.use('/settings', settingsRoutes);

module.exports = mainRouter;