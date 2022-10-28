const Game = require('../db/models/Games');

exports.getAll = (req, res) => {
    Game.find()
        .then(games => {
            res.status(200).send(games);
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal server error!',
                error
            });
        })
}

exports.getSingle = (req, res) => {
    const _id = req.params.id;

    Game.find({ _id })
        .then(games => {
            if (games.length > 0) {
                res.status(200).send(games[0]);
            } else {
                res.status(400).json({
                    message: 'Game does not exist.'
                });
            } 

        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal server error.',
                error
            });
        })
}

exports.addNew = (req, res) => {
    const data = { ...req.body };

    Game.insertMany(data)
        .then(() => {
            res.status(200).json({
                message: 'New game has been added.'
            })
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal server error!',
                error
            });
        })
}

exports.edit = (req, res) => {
    const _id = req.params.id;
    const data = { ...req.body };

    Game.updateOne(
        { _id },
        { ...data }
    )
    .then(() => {
        res.status(200).json({
            message: 'Game has been updated.'
        })
    })
    .catch(error => {
        res.status(500).json({
            message: 'Internal server error.',
            error
        })
    })
}

exports.delete = (req, res) => {
    const _id = req.params.id;

    Game.deleteOne({ _id })
        .then(() => {
            res.status(200).json({
                message: 'Game has been deleted.'
            })
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal server error!',
                error
            })
        })
}