const mongoose = require('mongoose');
const { orderSchema } = require('../models/order-model');
const { ITEM_PRICE } = require('../resources/constants');

// Creating a model with Order as the object name and orderSchema as the Schema
const Order = mongoose.model('Order', orderSchema)

const placeOrder = (req, res, next) => {
    let orderDetails = req.body;

    // calculate total amount
    orderDetails.total = orderDetails.items.reduce((currentTotal, item) => {
        return currentTotal + ITEM_PRICE[item.name]*item.quantity
    }, 0);

    let newOrder = new Order(orderDetails);
    newOrder.save((err, order) => {
        if (err) {
            // forward to express error handling middleware
            return next(err);
        }
        // place the order on the queue
        req.exchangeServices.publishOrderToExchange(order); 

        res.status(201).json(order);
    })
}

const getOrderById = (req,res, next) => {
    Order.findById(req.params.orderId).select('-__v -items._id').exec((err, order) => {
        if (err) {
            // forward to express error handling middleware
            return next(err);
        }
        res.status(200).json(order);
    })
}

module.exports = {
    placeOrder,
    getOrderById
}