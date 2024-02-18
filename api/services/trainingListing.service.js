const TrainingListingRepository = require('../repositories/trainingListing.repository');
const TrainingRepository = require('../repositories/training.repository');
const UserRepository = require('../repositories/user.repository');

class TrainingListingService {
    static async getAllTrainingListing() {
        try {
            return await TrainingListingRepository.getAllTrainingListing();
        } catch (error) {
            throw error;
        }
    }

    static async getTrainingListingById(id) {
        try {
            return await TrainingListingRepository.getListingById(id);
        } catch (error) {
            throw error;
        }
    }

    static async addTrainingParticipation(userId, trainingId) {
        // Check if user & training exists
        try {

            const listingExists = await TrainingListingRepository.getListingById(trainingId);
            if (listingExists) {
                return 3;
            }
            const userExists = await UserRepository.getUserById(userId);
            if (!userExists) {
                return 1;
            }

            const trainingExists = await TrainingRepository.getTrainingById(trainingId);
            if (!trainingExists) {
                return 2;
            }
        } catch (error) {
            console.log(error);
            throw error;
        }

        try {
            return await TrainingListingRepository.addTrainingParticipation(userId, trainingId);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = TrainingListingService;