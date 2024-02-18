const TrainingListingRepository = require('../repositories/trainingListing.repository');

class TrainingListingService {
    static async getAllTrainingListing() {
        try {
            return await TrainingListingRepository.getAllTrainingListing();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = TrainingListingService;