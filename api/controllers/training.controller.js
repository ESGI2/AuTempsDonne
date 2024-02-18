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

    static async addTraining(req, res) {
        try {
            const training = req.body;
            // input check
            if (!training.name || !training.description || !training.duration) {
                return res.status(400).json({ message: 'All fields are required' });
            }
            const newTraining = await TrainingService.addTraining(training);
            return res.status(201).json(newTraining);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = TrainingController;