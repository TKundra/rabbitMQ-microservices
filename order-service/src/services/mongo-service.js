const mongoose = require('mongoose');
const { logger } = require('./logger-service')

// environment variables
const MONGO_HOST = process.env.MONGO_HOST || 'localhost';
const MONGO_URI = `mongodb://${MONGO_HOST}:27017/rabbitmqburgerDB`;

// Connect to MongoDB
const mongoConnect = () => {
    try {
        mongoose.connect(MONGO_URI, (err) => {
            if (err) {
                console.error('Mongo ERROR ' + err)
            }
        })

        mongoose.connection.on('connected', function () {
            logger.log('info', `Mongoose - connection established at ${MONGO_URI}`);
        });

        // If the connection throws an error
        mongoose.connection.on('error', function () {
            logger.log('fatal', `Mongoose - connection error: ${MONGO_URI}`);
        });

        // When the connection is disconnected
        mongoose.connection.on('disconnected', function () {
            logger.log('fatal', `Mongoose - disconnected: ${MONGO_URI}`);
        });
    } catch (error) {
        logger('fatal', `Mongoose - ${error}`)
    }
}


module.exports = { mongoConnect }