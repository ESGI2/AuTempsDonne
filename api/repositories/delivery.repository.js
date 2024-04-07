const Delivery = require('../models/delivery.model');

class DeliveryRepository {
    static async createDelivery(departure, theoretical_arrival, id_truck,status) {
        console.log(theoretical_arrival);
        try {
            return await Delivery.create({ departure, theoretical_arrival, id_truck,status });
        } catch (error) {
            console.log(error);
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
