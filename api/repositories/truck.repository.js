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
    static async getAllTrucks() {
        try {
            return await Truck.findAll();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getTruckById(id) {
        try {
            return await Truck.findByPk(id);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async updateTruckLocation(id, newLocation) {
        try {
            const truck = await Truck.findByPk(id);

            if (!truck) {
                throw new Error('Truck not found');
            }

            truck.localisation = newLocation;
            await truck.save();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}

module.exports = TruckRepository;
