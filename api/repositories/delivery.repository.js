const Delivery = require('../models/delivery.model');

class DeliveryRepository {
    static async createDelivery(departure, theoricalArrival, idTruck,status) {
        console.log(departure, theoricalArrival, idTruck,status);
        try {
            return await Delivery.create({ departure, theoricalArrival, idTruck,status });
        } catch (error) {
            throw error;
        }
    }

    static async getAllDeliveries() {
        try {
            const deliveries = await Delivery.findAll();
            return deliveries;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DeliveryRepository;
