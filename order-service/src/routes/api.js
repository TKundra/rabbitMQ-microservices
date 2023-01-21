const { menuRouter } = require('./menu-router');
const { orderRouter } = require('./order-router');
const { infoRouter } = require('./info-router');

const addRoutes = (app) => {
    app.use('/api/info', infoRouter);    
    app.use('/api/menu', menuRouter);
    app.use('/api/orders', orderRouter);
}

module.exports = { addRoutes }