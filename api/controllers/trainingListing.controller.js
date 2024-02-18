const TrainingListingService = require('../services/trainingListing.service');

class TrainingListingController {
    static async getAllTrainingListing(req, res) {
        try {
            const trainingListing = await TrainingListingService.getAllTrainingListing();
            res.status(200).json(trainingListing);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getListingById(req, res) {
        try {
            const { id } = req.params;
            const trainingListing = await TrainingListingService.getTrainingListingById(id);
            res.status(200).json(trainingListing);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async addTrainingParticipation(req, res) {
        try {
            const { userId, trainingId } = req.query;
            const newTrainingParticipation = await TrainingListingService.addTrainingParticipation(userId, trainingId);
            if (newTrainingParticipation === 1) {
                return res.status(400).json({ message: 'User not found' });
            } else if (newTrainingParticipation === 2) {
                return res.status(400).json({ message: 'Training not found' });
            } else if (newTrainingParticipation === 3) {
                return res.status(400).json({ message: 'User already participating in this training' });
            }

            res.status(201).json({
                message: 'Training participation added',
                links : {
                    'training' : `/training/${trainingId}`,
                    'user' : `/user/${userId}`
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = TrainingListingController;