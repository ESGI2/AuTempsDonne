const TrainingListing = require('../models/trainingListing.model');

class TrainingListingRepository {
    static async getAllTrainingListing() {
        try {
            return await TrainingListing.findAll();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = TrainingListingRepository;