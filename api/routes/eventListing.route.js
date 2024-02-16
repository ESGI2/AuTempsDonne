const express = require('express');
const router = express.Router();
const EventListingController = require('../controllers/eventListing.controller');

router.post('/', EventListingController.addUserToEvent);

module.exports = router;
