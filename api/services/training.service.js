const TrainingRepository = require('../repositories/training.repository');

class TrainingService {
    static async getAllTraining() {
        try {
            return await TrainingRepository.getAllTraining();
        } catch (error) {
            throw error;
        }
    }

    static async getTrainingById(id) {
        try {
            return await TrainingRepository.getTrainingById(id);
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

    static async updateTraining(id, training) {
        try {
            return await TrainingRepository.updateTraining(id, training);
        } catch (error) {
            throw error;
        }
    }

    static async deleteTraining(id) {
        try {
            return await TrainingRepository.deleteTraining(id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = TrainingService;