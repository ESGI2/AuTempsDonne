const TruckRepository = require('../repositories/truck.repository');

class TruckServices {
    static async addTruck(data) {
        try {
            await TruckRepository.addTruck(data);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getAllTrucks() {
        try {
            return await TruckRepository.getAllTrucks();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getTruckById(id) {
        try {
            return await TruckRepository.getTruckById(id);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async updateTruckLocalisation(id, newLocalisation) {
        try {
            return await TruckRepository.updateTruckLocalisation(id, newLocalisation);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async deleteTruckById(id) {
        try {
            await TruckRepository.deleteTruckById(id);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = TruckServices;
