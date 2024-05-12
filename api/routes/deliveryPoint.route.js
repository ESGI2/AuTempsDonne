const express = require('express');
const router = express.Router();
const DeliveryPointController = require('../controllers/deliveryPoint.controller');

router.post('/', DeliveryPointController.createDeliveryPoint);
router.get('/', DeliveryPointController.getAllDeliveryPoints);
router.delete('/:id', DeliveryPointController.deleteDeliveryPoint);

module.exports = router;
