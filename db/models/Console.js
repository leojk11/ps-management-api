const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const console = new Schema({
    name: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    overall_time_played: {
        type: Number
    },
    today_time_played: {
        type: Number
    },

    games: {
        type: String
    },
    status: {
        type: String // FREE, BUSY, RESERVED
    },
    playing: {
        type: Boolean,
        required: true
    },

    start_time: {
        type: Date // this will be used in order to calculate time difference
    }
});

const Console = mongoose.model('Console', console);
module.exports = Console;