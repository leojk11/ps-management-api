const express = require('express');
const mainRouter = express();

const consolesRoutes = require('../routes/consoles');

mainRouter.use('/consoles', consolesRoutes);

module.exports = mainRouter;