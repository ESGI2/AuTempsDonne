const express = require('express');
const router = express.Router();
const ActivityController = require('../controllers/activity.controller');
const authMiddleware = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");


router.get('/', ActivityController.getAllActivities);
// router.get('/:id', [authMiddleware, isAdmin],ActivityController.getActivityById);
// router.post('/',[authMiddleware, isAdmin], ActivityController.addActivity);
// router.put('/:id',[authMiddleware, isAdmin], ActivityController.updateActivity);
// router.delete('/:id',[authMiddleware, isAdmin], ActivityController.deleteActivity);

                            // Verif si il est responsable \\
module.exports = router;
