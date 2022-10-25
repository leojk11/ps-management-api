const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const settings = new Schema({
    price_per_hour: {
        type: Number
    }
});

const Settings = mongoose.model('Settings', settings);
module.exports = Settings;