const Training = require('../models/training.model');

class TrainingRepository {
    static async getAllTraining() {
        try {
            return await Training.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async getTrainingById(id) {
        try {
            return await Training.findByPk(id);
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

    static async updateTraining(id, training) {
        try {
            const trainingToUpdate = await Training.findByPk(id);
            if (trainingToUpdate) {
                await Training.update( {
                    name: training.name,
                    description: training.description,
                    duration: training.duration
                }, { where: { id: id } });
                return training;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async deleteTraining(id) {
        try {
            const trainingToDelete = await Training.findByPk(id);
            if (trainingToDelete) {
                const deletedTraining = await Training.destroy({
                    where: { id: id }
                });
                return deletedTraining;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = TrainingRepository;