const express = require('express');
const router = express.Router();
const trainingListingController = require('../controllers/trainingListing.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const idAdmin = require('../middlewares/isAdmin');

router.get('/', authMiddleware, trainingListingController.getListingByParams);
router.post('/', authMiddleware, trainingListingController.addTrainingParticipation);
router.delete('/', authMiddleware, trainingListingController.deleteTrainingParticipation);

module.exports = router;