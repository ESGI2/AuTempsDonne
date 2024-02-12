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
}

module.exports = TruckServices;
