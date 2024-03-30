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

    static async getTrainingListingById(idUser, idTraining) {
        try {
            return await TrainingListingRepository.getListingById(idUser, idTraining);
        } catch (error) {
            throw error;
        }
    }

    static async getTrainingListingByUserId(userId) {
        try {
            return await TrainingListingRepository.getTrainingListingByUserId(userId);
        } catch (error) {
            throw error;
        }
    }

    static async getTrainingListingByTrainingId(trainingId) {
        try {
            return await TrainingListingRepository.getTrainingListingByTrainingId(trainingId);
        } catch (error) {
            throw error;
        }
    }

    static async addTrainingParticipation(userId, trainingId) {
        // Check if user & training exists
        try {

            const listingExists = await TrainingListingRepository.getListingById(userId, trainingId);
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

    static async deleteTrainingParticipation(userId, trainingId) {

        // Check if user & training exists
        try {

            const listingExists = await TrainingListingRepository.getListingById(userId, trainingId);
            const userExists = await UserRepository.getUserById(userId);
            const trainingExists = await TrainingRepository.getTrainingById(trainingId);
            if (!userExists) {
                return 1;
            }
            if (!trainingExists) {
                return 2;
            }
            if (!listingExists) {
                return 3;
            }
        } catch (error) {
            console.log(error);
            throw error;
        }

        try {
            await TrainingListingRepository.deleteTrainingParticipation(userId, trainingId);
            return 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = TrainingListingService;