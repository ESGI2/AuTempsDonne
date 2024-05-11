const express = require('express');
const eventController =  require('../controllers/event.controller');
const router =  express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');
const isVolunteer = require('../middlewares/isVolunteer');

router.get('/availableUser' ,[authMiddleware, isAdmin], eventController.getAvailableUsers);
router.get('/user/:id',[authMiddleware, isVolunteer], eventController.getEventByUserId);
router.get('/',[authMiddleware, isVolunteer], eventController.getAllEvents);
router.post('/',[authMiddleware, isAdmin], eventController.addEvent);
router.put('/:id',[authMiddleware, isAdmin], eventController.updateEvent);
router.delete('/:id',[authMiddleware, isAdmin], eventController.deleteEvent);


module.exports = router;