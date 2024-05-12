const express = require('express');
const router = express.Router();
const DeliveryListingController = require('../controllers/deliveryListing.controller');

router.get('/Arrival', DeliveryListingController.findByArrival);
router.get('/Departure', DeliveryListingController.findByDeparture);
router.get('/:id', DeliveryListingController.findByDeliveryId);
router.post('/', DeliveryListingController.createDeliveryListing);



module.exports = router;
