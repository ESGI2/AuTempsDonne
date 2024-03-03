const express = require('express');
const router = express.Router();
const EventListingController = require('../controllers/eventListing.controller');
const authMiddleware = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");

router.post('/',[authMiddleware, isAdmin] , EventListingController.addUserToEvent);
router.get('/', [authMiddleware, isAdmin], EventListingController.getListingByParam);
router.delete('/', [authMiddleware, isAdmin], EventListingController.deleteUserListing);

module.exports = router;
