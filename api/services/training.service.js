const TrainingRepository = require('../repositories/training.repository');

class TrainingService {
    static async getAllTraining() {
        try {
            return await TrainingRepository.getAllTraining();
        } catch (error) {
            throw error;
        }
    }

    static async addTraining(newTraining) {
        try {
            return await TrainingRepository.addTraining(newTraining);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = TrainingService;