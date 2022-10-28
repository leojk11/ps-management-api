const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gamesSchema = new Schema({
    name: {
        type: String
    },
    year: {
        type: String
    }
});

const Game = mongoose.model('Game', gamesSchema);
module.exports = Game;