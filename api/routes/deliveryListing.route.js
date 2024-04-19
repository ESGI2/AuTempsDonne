const express = require('express');
const router = express.Router();
const DeliveryListingController = require('../controllers/deliveryListing.controller');

router.post('/', DeliveryListingController.createDeliveryListing);
router.get('/:id', DeliveryListingController.findByDeliveryId);
router.get('/Departure', DeliveryListingController.findByDeparture);
router.get('/Arrival', DeliveryListingController.findByArrival);

module.exports = router;
