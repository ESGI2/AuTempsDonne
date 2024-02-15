const express = require('express');
const router = express.Router();
const ActivityController = require('../controllers/activity.controller');


router.get('/', ActivityController.getAllActivities);
router.get('/:id', ActivityController.getActivityById);
router.post('/', ActivityController.addActivity);
router.put('/:id', ActivityController.updateActivity);
router.delete('/:id', ActivityController.deleteActivity);

module.exports = router;
