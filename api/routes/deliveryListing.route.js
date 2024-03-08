const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const DeliveryListingController = require('../controllers/deliveryListing.controller');

router.post('/', authMiddleware, DeliveryListingController.createDeliveryListing);


module.exports = router;
