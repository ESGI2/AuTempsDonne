const TrainingListingService = require('../services/trainingListing.service');

class TrainingListingController {
    static async getListingByParams(req, res) {
        const { userId, trainingId } = req.query;
        if (userId && trainingId) {
            const trainingListing = await TrainingListingService.getTrainingListingById(userId, trainingId);
            if (!trainingListing) {
                return res.status(404).json({ message: 'Training listing not found' });
            }
            return res.status(200).json({trainingListing});
        } else if (userId) {
            const trainingListing = await TrainingListingService.getTrainingListingByUserId(userId);
            if (!trainingListing) {
                return res.status(404).json({ message: 'Training listing not found' });
            }
            return res.status(200).json({trainingListing});
        } else if (trainingId) {
            const trainingListing = await TrainingListingService.getTrainingListingByTrainingId(trainingId);
            if (!trainingListing) {
                return res.status(404).json({ message: 'Training listing not found' });
            }
            return res.status(200).json({trainingListing});
        }

        const trainingListing = await TrainingListingService.getAllTrainingListing();
        if (!trainingListing) {
            return res.status(404).json({ message: 'Training listing not found' });
        }

        res.status(200).json(trainingListing);
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
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async deleteTrainingParticipation(req, res) {
        try {
            const { idUser, idTraining } = req.query;
            const deletedTrainingParticipation = await TrainingListingService.deleteTrainingParticipation(idUser, idTraining);
            if (deletedTrainingParticipation === 1) {
                return res.status(400).json({ message: 'User not found' });
            } else if (deletedTrainingParticipation === 2) {
                return res.status(400).json({ message: 'Training not found' });
            } else if (deletedTrainingParticipation === 3) {
                return res.status(400).json({ message: 'User not participating in this training' });
            } else if (deletedTrainingParticipation === 0) {
                res.status(200).json({ message: 'Participation deleted' });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = TrainingListingController;