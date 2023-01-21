const { amqpConnectAndConsume } = require('./services/mq-service')

// Connect to RabbitMQ and consume orders
const startServer = () => {
    amqpConnectAndConsume();
}

module.exports = { startServer }