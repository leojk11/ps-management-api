const Revenue = require('../db/models/Revenue');

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
        .then(revenues => {
            res.status(200).send(revenues);
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
                        console.log('total_earning', mRevenue.total_earning);
                        if (mRevenue.total_earning) {
                            totalMRevenue = totalMRevenue + mRevenue.total_earning;
                        }
                    }

                    // console.log('mRevenues', mRevenues);

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