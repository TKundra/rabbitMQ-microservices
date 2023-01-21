const { ORDER_SERVICE_WELCOME_MSG } = require('../resources/constants');

const getInfo = (req, res) => {
    res.status(200).json({message: ORDER_SERVICE_WELCOME_MSG});
}

module.exports = { getInfo }