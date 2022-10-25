const Settings = require('../db/models/Settings');

exports.getAll = (req, res) => {
    Settings.find()
        .then(settings => {
            res.status(200).send(settings[0]);
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal server error!',
                error
            });
        })
}

exports.add = (req, res) => {
    const body = {
        price_per_hour: 0
    };

    Settings.insertMany(body)
        .then(() => {
            res.status(200).json({
                message: 'ok'
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal server error!',
                error
            });
        })
}

exports.edit = (req, res) => {
    const data = { ...req.body };

    Settings.find()
        .then(settings => {
            Settings.updateOne(
                { _id: settings[0]._id },
                { ...data }
            )
            .then(() => {
                res.status(200).json({
                    message: 'Settings have been updated!'
                })
            })
            .catch(error => {
                res.status(500).json({
                    message: 'Internal server error!',
                    error
                });
            })
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal server error!',
                error
            });
        })
}