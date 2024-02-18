const express = require('express');
const router = express.Router();
const DeliveryDriverController = require('../controllers/deliveryDriver.controller');

router.post('/', DeliveryDriverController.createDeliveryDriver);

module.exports = router;
