const mongoose = require('mongoose');
const { logger } = require('./logger-service');

// environment variables
const MONGO_HOST = process.env.MONGO_HOST || 'localhost';
const MONGO_URI = `mongodb://${MONGO_HOST}:27017/rabbitmqburgerDB`;

// Connect to MongoDB
const mongoConnect = async () => {
    try {
        mongoose.connect(MONGO_URI, (err) => {
            if (err) {
                console.error('Mongo ERROR ' + err)
            }
        })

        const connection = mongoose.connection;

        // If the connection connected
        connection.on('connected', function () {
            logger.log('info', `Mongoose - connection established at ${MONGO_URI}`);
        });

        // If the connection throws an error
        connection.on('error', function () {
            logger.log('fatal', `Mongoose - connection error: ${MONGO_URI}`);
        });

        // When the connection is disconnected
        connection.on('disconnected', function () {
            logger.log('fatal', `Mongoose - disconnected: ${MONGO_URI}`);
        });
    } catch (error) {
        logger('fatal', `Mongoose - ${error}`)
    }
}

// Change order status with ID
const changeOrderStatus = (OrderModel, orderId, status) => {
    OrderModel.findByIdAndUpdate(orderId, { status: status }, (err, order) => {
        if (err) {
            logger('fatal', `Mongoose - ${err}`)
        }
        else {
            logger.info(`Order - ${orderId} ${status}`);
        }
    });
}

module.exports = {
    mongoConnect,
    changeOrderStatus
}