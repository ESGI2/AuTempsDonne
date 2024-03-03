const TrainingService = require('../services/training.service');

class TrainingController {
    static async getAllTraining(req, res) {
        try {
            const trainings = await TrainingService.getAllTraining();
            return res.status(200).json(trainings);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async getTrainingById(req, res) {
        try {
            const { id } = req.params;
            const training = await TrainingService.getTrainingById(id);
            if (!training) {
                return res.status(404).json({ message: 'Training not found' });
            }
            return res.status(200).json(training);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async addTraining(req, res) {
        try {
            const training = req.body;
            // input check
            if (!training.name || !training.description || !training.duration) {
                return res.status(400).json({ message: 'All fields are required' });
            }
            const newTraining = await TrainingService.addTraining(training);
            return res.status(201).json({ message: 'Training added'});
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async updateTraining(req, res) {
        try {
            const { id } = req.params;
            const training = req.body;
            // input check
            if (!training.name && !training.description && !training.duration) {
                return res.status(400).json({ message: 'At least one field is required'});
            }
            const updateTraining = await TrainingService.updateTraining(id, training);
            if (!updateTraining) {
                return res.status(404).json({ message: 'Training not found' });
            }
            return res.status(200).json({ message: 'Training updated'});
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async deleteTraining(req, res) {
        try {
            const { id } = req.params;
            const training = await TrainingService.deleteTraining(id);
            if (!training) {
                return res.status(404).json({ message: 'Training not found' });
            }
            return res.status(200).json({ message: 'Training deleted'});
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = TrainingController;