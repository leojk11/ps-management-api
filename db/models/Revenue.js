const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const revenue = new Schema({
    total_earning: {
        type: Number
    },

    console_id: {
        type: String
    },

    date: {
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

const Revenue = mongoose.model('Revenue', revenue);
module.exports = Revenue;