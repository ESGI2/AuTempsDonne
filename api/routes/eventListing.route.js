const express = require('express');
const router = express.Router();
const EventListingController = require('../controllers/eventListing.controller');
const authMiddleware = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");
const isMe = require("../middlewares/isMe");
const isVolunteer = require("../middlewares/isVolunteer");

router.post('/',[authMiddleware , isVolunteer] , EventListingController.addUserToEvent);
router.get('/checkUserInEvent', [authMiddleware , isVolunteer], EventListingController.checkUserInEvent);
router.get('/', [authMiddleware, isAdmin], EventListingController.getListingByParam);
router.delete('/', [authMiddleware, isAdmin], EventListingController.deleteUserListing);

module.exports = router;
