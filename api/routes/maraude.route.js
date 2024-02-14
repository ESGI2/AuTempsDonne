const express = require('express');
const maraudeController = require('../controllers/maraude.controller');
const router = express.Router();

router.get('/', maraudeController.getAllMaraudes);
router.get('/:id', maraudeController.getMaraudeById);
router.post('/', maraudeController.addMaraude);
router.put('/:id', maraudeController.updateMaraude);
router.delete('/:id', maraudeController.deleteMaraude);


module.exports = router;
