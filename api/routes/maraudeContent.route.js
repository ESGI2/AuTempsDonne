const express = require('express');
const authMiddleware = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");
const router = express.Router();
const MaraudeContent = require('../controllers/maraudeContent.controller');

router.get('/', [authMiddleware, isAdmin], MaraudeContent.getAll);
router.get('/:id', [authMiddleware, isAdmin], MaraudeContent.getByMaraude);
router.post('/', [authMiddleware, isAdmin], MaraudeContent.create);
router.delete('/:id', [authMiddleware, isAdmin], MaraudeContent.delete);
router.put('/:id', [authMiddleware, isAdmin], MaraudeContent.update);

module.exports = router;
