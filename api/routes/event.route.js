const express = require('express');
const eventController =  require('../controllers/event.controller');
const router =  express.Router();

router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);


module.exports = router;