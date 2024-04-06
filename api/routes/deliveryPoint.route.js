const express = require('express');
const router = express.Router();
const DeliveryPointController = require('../controllers/deliveryPoint.controller');

router.post('/', DeliveryPointController.createDeliveryPoint);
router.get('/', DeliveryPointController.getAllDeliveryPoints);

module.exports = router;
