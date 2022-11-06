const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const drinkRevenue = new Schema({
    total_earning: {
        type: Number
    },

    drink_id: {
        type: String
    },

    date: {
        type: String
    },
    time: {
        type: String
    },

    day: {
        type: Number
    },
    month: {
        type: Number
    },
    year: {
        type: Number
    }
});

const DrinkRevenue = mongoose.model('DrinkRevenue', drinkRevenue);
module.exports = DrinkRevenue;