const express = require('express');
const router = express.Router();
const wasabiController = require('../controllers/wasabi.controller');

// GET
router.get('/maraude/:id', wasabiController.getMaraudeFile);

module.exports = router;