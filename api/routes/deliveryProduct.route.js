const express = require('express');
const router = express.Router();
const DeliveryProductController = require('../controllers/deliveryProduct.controller');

router.post('/', DeliveryProductController.addDeliveryProduct);
router.post('/', DeliveryProductController.addDeliveryProductIfNotExist);
router.get('/', DeliveryProductController.getDeliveryProductsByDeliveryId);

module.exports = router;
