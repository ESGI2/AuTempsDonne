const express = require('express');
const router = express.Router();
const DeliveryListingController = require('../controllers/deliveryListing.controller');

router.get('/last', DeliveryListingController.findDeliveryLastStep);
router.get('/:id', DeliveryListingController.findByDeliveryId);
router.post('/', DeliveryListingController.createDeliveryListing);



module.exports = router;
