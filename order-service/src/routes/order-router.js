const { getOrderById, placeOrder } = require('../controllers/order-controller');
const express = require ('express');

const router = express.Router()

router.get('/:orderId', getOrderById);
router.post('/', placeOrder);

module.exports = { orderRouter: router }