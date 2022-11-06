const Revenue = require('../db/models/Revenue');
const DrinkRevenue = require('../db/models/DrinkRevenue');

exports.getAll = (req, res) => {
    const filters = {};

    if (req.query.day) {
        filters['day'] = parseInt(req.query.day);
    }
    if (req.query.month) {
        filters['month'] = parseInt(req.query.month);
    }
    if (req.query.year) {
        filters['year'] = parseInt(req.query.year);
    }

    Revenue.find({ ...filters })
        .sort({ _id: -1 })
        .then(revenues => {
            const revenuesToSend = [];

            for (const revenue of revenues) {
                if (revenue.total_earning > 0) {
                    revenuesToSend.push(revenue);
                }
            }

            res.status(200).send(revenuesToSend);
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

    Revenue.find({ _id: id })
        .then(revenues => {
            if (revenues.length > 0) {
                res.status(200).send(revenues[0]);
            } else {
                res.status(400).json({
                    message: 'revenue not found'
                });
            }
        })
}

exports.getTotalInfo = (req, res) => {
    const day = req.params.day;
    const month = req.params.month;
    const year = req.params.year;

    Revenue.find({ year })
        .then(yRevenues => {
            let totalYRevenue = 0;
            for (const yRevenue of yRevenues) {
                if (yRevenue.total_earning) {
                    totalYRevenue = totalYRevenue + yRevenue.total_earning;
                }
            }

            Revenue.find({ month })
                .then(mRevenues => {
                    let totalMRevenue = 0;
                    for (const mRevenue of mRevenues) {
                        if (mRevenue.total_earning) {
                            totalMRevenue = totalMRevenue + mRevenue.total_earning;
                        }
                    }

                    Revenue.find({ day })
                        .then(dRevenues => {
                            let totalDRevenue = 0;
                            for (const dRevenue of dRevenues) {
                                if (dRevenue.total_earning) {
                                    totalDRevenue = totalDRevenue + dRevenue.total_earning;
                                }
                            }
        
                            res.status(200).json({
                                yearly_earning: totalYRevenue,
                                monthly_earning: totalMRevenue,
                                daily_earning: totalDRevenue
                            })
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
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Internal server error!',
                error
            })
        })
}

// drinks revenue
exports.getAllDrinksRevenue = (req, res) => {
    const filters = {};

    if (req.query.day) {
        filters['day'] = parseInt(req.query.day);
    }
    if (req.query.month) {
        filters['month'] = parseInt(req.query.month);
    }
    if (req.query.year) {
        filters['year'] = parseInt(req.query.year);
    }

    DrinkRevenue.find({ ...filters })
        .sort({ _id: -1 })
        .then(revenues => {
            const revenuesToSend = [];

            for (const revenue of revenues) {
                if (revenue.total_earning > 0) {
                    revenuesToSend.push(revenue);
                }
            }

            res.status(200).send(revenuesToSend);
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal server error!',
                error
            });
        })
}

exports.getTotalDrinkRevenueInfo = (req, res) => {
    const day = req.params.day;
    const month = req.params.month;
    const year = req.params.year;

    DrinkRevenue.find({ year })
        .then(yRevenues => {
            let totalYRevenue = 0;
            for (const yRevenue of yRevenues) {
                if (yRevenue.total_earning) {
                    totalYRevenue = totalYRevenue + yRevenue.total_earning;
                }
            }

            DrinkRevenue.find({ month })
                .then(mRevenues => {
                    let totalMRevenue = 0;
                    for (const mRevenue of mRevenues) {
                        if (mRevenue.total_earning) {
                            totalMRevenue = totalMRevenue + mRevenue.total_earning;
                        }
                    }

                    DrinkRevenue.find({ day })
                        .then(dRevenues => {
                            let totalDRevenue = 0;
                            for (const dRevenue of dRevenues) {
                                if (dRevenue.total_earning) {
                                    totalDRevenue = totalDRevenue + dRevenue.total_earning;
                                }
                            }
        
                            res.status(200).json({
                                yearly_earning: totalYRevenue,
                                monthly_earning: totalMRevenue,
                                daily_earning: totalDRevenue
                            })
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
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Internal server error!',
                error
            })
        })
}