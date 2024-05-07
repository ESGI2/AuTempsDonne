const express = require('express');
const authMiddleware = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");
const router = express.Router();
const MaraudePointController = require('../controllers/maraudePoint.controller');

router.get('/', [authMiddleware, isAdmin], MaraudePointController.getAllMaraudePoints);
router.get('/:id',[authMiddleware, isAdmin], MaraudePointController.getMaraudePointById);
router.post('/',[authMiddleware, isAdmin], MaraudePointController.addMaraudePoint);
// router.put('/:id',[authMiddleware, isAdmin], MaraudePointController.updateMaraudePoint);
router.delete('/:id',[authMiddleware, isAdmin], MaraudePointController.deleteMaraudePoint);

module.exports = router;
