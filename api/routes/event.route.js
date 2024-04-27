const express = require('express');
const eventController =  require('../controllers/event.controller');
const router =  express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');

router.get('/availableUser' ,[authMiddleware, isAdmin], eventController.getAvailableUsers);
router.get('/',[authMiddleware, isAdmin], eventController.getAllEvents);
router.get('/:id',[authMiddleware, isAdmin], eventController.getEventById);
router.post('/',[authMiddleware, isAdmin], eventController.addEvent);
router.put('/:id',[authMiddleware, isAdmin], eventController.updateEvent);
router.delete('/:id',[authMiddleware, isAdmin], eventController.deleteEvent);


module.exports = router;