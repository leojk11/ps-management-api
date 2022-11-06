const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const drinkSchema = new Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },

    total_amount: {
        type: Number
    },
    amount_sold: {
        type: Number
    },
    total_revenue: {
        type: Number
    }
});

const Drink = mongoose.model('Drink', drinkSchema);
module.exports = Drink;