const express = require('express');
const router = express.Router();
const DeliveryDriverController = require('../controllers/deliveryDriver.controller');
const authMiddleware = require("../middlewares/authMiddleware");

router.post('/', authMiddleware , DeliveryDriverController.createDeliveryDriver);
router.get('/', authMiddleware ,DeliveryDriverController.getAllDeliveryDrivers);

module.exports = router;
