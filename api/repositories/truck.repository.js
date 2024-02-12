const Truck = require('../models/truck.model');

class TruckRepository {
    static async addTruck(data) {
        try {
            await Truck.create({
                name: data.name,
                localisation: data.localisation
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = TruckRepository;
