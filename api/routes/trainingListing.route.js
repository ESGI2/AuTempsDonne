const express = require('express');
const router = express.Router();
const trainingListingController = require('../controllers/trainingListing.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const idAdmin = require('../middlewares/isAdmin');

router.get('/', authMiddleware, trainingListingController.getAllTrainingListing);
router.get('/:id', authMiddleware, trainingListingController.getListingById);
router.post('/', authMiddleware, trainingListingController.addTrainingParticipation);
// router.delete('/:id', authMiddleware, idAdmin, trainingListingController.deleteTrainingParticipation);

module.exports = router;