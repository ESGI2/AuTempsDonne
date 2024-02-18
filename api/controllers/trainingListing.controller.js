const TrainingService = require('../services/training.service');

class TrainingListingController {
    static async getAllTrainingListing(req, res) {
        try {
            const trainingListing = await TrainingService.getAllTrainingListing();
            res.status(200).json(trainingListing);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = TrainingListingController;