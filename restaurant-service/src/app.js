const { mongoConnect } = require('./services/mongo-service');
const { amqpConnectAndConsume} = require('./services/mq-service');

startServer = () => {
    // Connect to MongoDB
    mongoConnect();
    // Connect to RabbmitMQ and consume orders
    amqpConnectAndConsume();
}

module.exports = {
    startServer: startServer
}