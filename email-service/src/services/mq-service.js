const MQ_HOST = process.env.MQ_HOST;
const PREFETCH_COUNT = parseInt(process.env.PREFETCH_COUNT) || 2
const amqp = require("amqplib");
const { sendConfirmation } = require('../controllers/email-controller')
const { logger } = require('./logger-service')
const { EXCHANGE, QUEUE } = require('../resources/constants');
const MQ_URL = `amqp://${MQ_HOST || 'localhost'}:5672`;
let orderChannel = null;

// Connect to RabbitMQ and consumer orders
const amqpConnectAndConsume = async () => {
    try {
        const mqConnection = await amqp.connect(MQ_URL);
        logger.info(`AMQP - connection established at ${MQ_URL}`)
        
        orderChannel = await mqConnection.createChannel();
        
        await orderChannel.assertExchange(EXCHANGE, 'fanout', {
            durable: false
        });

        // Ensure that the queue exists or create one if it doesn't
        await orderChannel.assertQueue(QUEUE);
        await orderChannel.bindQueue(QUEUE, EXCHANGE, '');
        
        // Only send <PREFETCH_COUNT> emails at a time
        orderChannel.prefetch(PREFETCH_COUNT);

        orderChannel.consume(QUEUE, order => {
            sendConfirmation(order, orderChannel);
        });
    }
    catch (ex) {
        logger.log('fatal',`AMQP - ${ex}`);
        process.exit();
    }
}

module.exports = { amqpConnectAndConsume }