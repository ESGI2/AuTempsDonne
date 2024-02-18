const TrainingListing = require('../models/trainingListing.model');

class TrainingListingRepository {
    static async getAllTrainingListing() {
        try {
            return await TrainingListing.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async getListingById(id) {
        try {
            return await TrainingListing.findByPk(id);
        } catch (error) {
            throw error;
        }
    }

    static async addTrainingParticipation(userId, trainingId) {
        try {
            return await TrainingListing.create({
                id_user: userId,
                id_training: trainingId
            });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = TrainingListingRepository;