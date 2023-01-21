const express = require ('express');
const { getInfo } = require('../controllers/info-controller');

const router = express.Router()

router.get('/', getInfo);

module.exports = { infoRouter: router }