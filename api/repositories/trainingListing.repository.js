const TrainingListing = require('../models/trainingListing.model');

class TrainingListingRepository {
    static async getAllTrainingListing() {
        try {
            return await TrainingListing.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async getListingById(userId, trainingId) {
        try {
            return await TrainingListing.findOne({
                where: {
                    id_user: userId,
                    id_training: trainingId
                }
            });
        } catch (error) {
            throw error;
        }
    }

    static async getTrainingListingByUserId(userId) {
        try {
            return await TrainingListing.findAll({
                where: {
                    id_user: userId
                }
            });
        } catch (error) {
            throw error;
        }
    }

    static async getTrainingListingByTrainingId(trainingId) {
        try {
            return await TrainingListing.findAll({
                where: {
                    id_training: trainingId
                }
            });
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

    static async deleteTrainingParticipation(userId, trainingId) {
        try {
            return await TrainingListing.destroy({
                where: {
                    id_user: userId,
                    id_training: trainingId
                }
            });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = TrainingListingRepository;