const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.post('/', authMiddleware, DeliveryListingController.createDeliveryListing);


module.exports = router;
