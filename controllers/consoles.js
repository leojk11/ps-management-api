const Console = require('../db/models/Console');

exports.getAll = (req, res) => {
    Console.find()
        .then(consoles => {
            res.status(200).send(consoles);
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal server error!',
                error
            });
        })
}

exports.getSingle = (req, res) => {
    const id = req.params.id;

    if (id) {
        Console.find({ _id: id })
            .then(consoles => {
                if (consoles.length > 0) {
                    res.status(200).send(consoles[0]);
                } else {
                    res.status(400).json({
                        message: 'Console does not exist!'
                    });
                }
            })
            .catch(error => {
                res.status(500).json({
                    message: 'Internal server error!',
                    error
                });
            })
    } else {
        res.status(400).json({
            message: 'Id is missing!'
        });
    }
}

exports.addNew = (req, res) => {
    const data = { 
        ...req.body,
        playing: false,
        status: 'FREE'
    };

    if(data.name === '' || !data.name) {
        res.status(400).json({
            message: 'Име е задолжително!'
        });
    } else if(data.model === '' || !data.model) {
        res.status(400).json({
            message: 'Модел е задолжителен!!'
        });
    } else {
        Console.find({ name: data.name })
            .then(consoles => {
                if (consoles.length > 0) {
                    res.status(400).json({
                        message: `Конзола сo име ${ data.name } веќе постои.`
                    });
                } else {
                    Console.insertMany(data)
                        .then(() => {
                            res.status(200).json({
                                message: 'Нова конзола е додаена успешно.'
                            });
                        })
                        .catch(error => {
                            res.status(500).json({
                                message: 'Internal server error!',
                                error
                            });
                        })
                }
            });
    }
}

exports.edit = (req, res) => {
    const id = req.params.id;
    const data = { ...req.body };

    if (id) {
        if (data.name === '') {
            res.status(200).json({
                message: 'Име е задолжително!'
            });
        } else {
            Console.updateOne(
                { _id: id },
                { ...data }
            )
            .then(() => {
                res.status(200).json({
                    message: 'Конзолата е успешно изменета.'
                });
            })
            .catch(error => {
                res.status(500).json({
                    message: 'Internal server error!',
                    error
                });
            })
        }
    } else {
        res.status(400).json({
            message: 'Id is missing!'
        });
    }
}

exports.startPlaying = (req, res) => {
    const id = req.params.id;

    if (id) {
        Console.updateOne(
            { _id: id },
            { playing: true }
        )
        .then(() => {
            res.status(200).json({
                message: 'Started!'
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal server error!',
                error
            });
        })
    } else {
        res.status(400).json({
            message: 'Id is missing!'
        });
    }
}

exports.stopPlaying = (req, res) => {
    const id = req.params.id;

    if (id) {
        Console.updateOne(
            { _id: id },
            { playing: false }
        )
        .then(() => {
            res.status(200).json({
                message: 'Stopped!'
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal server error!',
                error
            });
        })
    } else {
        res.status(400).json({
            message: 'Id is missing!'
        });
    }
}

exports.delete = (req, res) => {
    const id = req.params.id;

    if (id) {
        Console.find({ _id: id })
            .then(consoles => {
                if (consoles.length > 0) {
                    Console.deleteOne({ _id: id })
                    .then(() => {
                        res.status(200).json({
                            message: `Конзолата ${ consoles[0].name } е успешно избришана.`
                        })
                    })
                    .catch(error => {
                        res.status(500).json({
                            message: 'Internal server error!',
                            error
                        });
                    })
                } else {
                    res.status(400).json({
                        message: 'Console does not exist!'
                    });
                }
            })
            .catch(error => {
                res.status(500).json({
                    message: 'Internal server error!',
                    error
                });
            })
    } else {
        res.status(400).json({
            message: 'Id is missing!'
        });
    }
}