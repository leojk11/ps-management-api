const Drink = require('../db/models/Drink');
const DrinkRevenue = require('../db/models/DrinkRevenue');

exports.getAll = (req, res) => {
    Drink.find()
        .then(drinks => {
            res.status(200).send(drinks);
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

    Drink.find({ _id })
        .then(drinks => {
            if (drinks.length > 0) {
                res.status(200).send(drinks[0]);

            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal server error!',
                error
            });
        })
}

exports.add = (req, res) => {
    const data = { 
        ...req.body,
        total_revenue: 0,
        amount_sold: 0
    };

    Drink.insertMany(data)
        .then(() => {
            res.status(200).json({
                messaga: 'Нов пијалог е успешно додаден.'
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
    const _id = req.params.id;

    Drink.updateOne(
        { _id },
        { ...req.body }
    )
        .then(() => {
            res.status(200).json({
                message: 'Пијалокот е успешно изменет.'
            })
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal server error!',
                error
            });
        })
}

exports.sell = (req, res) => {
    const _id = req.params.id;
    const amountToSell = req.body.amount_to_sell;

    const now = new Date();
    const day = now.getDate();
    const month = now.getUTCMonth() + 1;
    const year = now.getFullYear();

    const hours = now.getHours();
    const minutes = now.getMinutes();

    const date = `${ day }/${ month }/${ year }`;
    const time = `${ (hours < 10 ? '0' : '') + hours }:${ (minutes < 10 ? '0' : '') + minutes }`;

    Drink.find({ _id })
        .then(drinks => {
            if (drinks[0].total_amount > 0) {
                if (drinks[0].total_amount < amountToSell) {
                    res.status(400).json({
                        message: 'Од овој пијалок немате доволно на залиха.'
                    });
                } else {
                    const newData = {
                        amount_sold: drinks[0].amount_sold + amountToSell,
                        total_revenue: drinks[0].total_revenue + (drinks[0].price * amountToSell),
                        total_amount: drinks[0].total_amount - amountToSell
                    };
        
                    Drink.updateOne(
                        { _id },
                        { ...newData }
                    )
                        .then(() => {
                            DrinkRevenue.insertMany({
                                total_earning: drinks[0].price * amountToSell,
                                drink_id: _id,
                                date, time, day, month, year
                            })
                                .then(() => {
                                    res.status(200).json({
                                        message: `${ drinks[0].name } е успешно продадено.`
                                    });
                                })
                                .catch(error => {
                                    console.log(error);
                                    res.status(500).json({
                                        message: 'Internal server error!',
                                        error
                                    });
                                })
                        })
                        .catch(error => {
                            console.log(error);
                            res.status(500).json({
                                message: 'Internal server error!',
                                error
                            });
                        })
                }
            } else {
                res.status(400).json({
                    message: 'Овој пијалок го немате на залиха.'
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Internal server error!',
                error
            });
        })
}

exports.delete = (req, res) => {
    const _id = req.params.id;

    Drink.deleteOne({ _id })
        .then(() => {
            res.status(200).json({
                message: 'Пијалокот е успешно избришан.'
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal server error!',
                error
            });
        })
}