const Training = require('../models/training.model');

class TrainingRepository {
    static async getAllTraining() {
        try {
            return await Training.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async addTraining(newTraining) {
        try {
            return await Training.create(newTraining);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = TrainingRepository;