const express = require('express');
const maraudeController = require('../controllers/maraude.controller');
const authMiddleware = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");
const router = express.Router();

router.get('/bestpath',[authMiddleware, isAdmin], maraudeController.bestpath);
router.get('/', [authMiddleware],maraudeController.getAllMaraudes);
router.get('/:id',[authMiddleware, isAdmin], maraudeController.getMaraudeById);
router.post('/',[authMiddleware, isAdmin], maraudeController.addMaraude);
router.put('/:id',[authMiddleware, isAdmin], maraudeController.updateMaraude);
router.delete('/:id',[authMiddleware, isAdmin], maraudeController.deleteMaraude);



module.exports = router;
