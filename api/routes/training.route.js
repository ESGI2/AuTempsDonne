const express = require('express');
const TrainingController = require('../controllers/training.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');

const router = express.Router();

router.get('/',[authMiddleware], TrainingController.getAllTraining);
router.get('/:id', [authMiddleware], TrainingController.getTrainingById);
router.post('/', [authMiddleware], TrainingController.addTraining);
// router.put('/:id', [authMiddleware], TrainingController.updateTraining);
// router.delete('/:id', [authMiddleware], TrainingController.deleteTraining);

module.exports = router;