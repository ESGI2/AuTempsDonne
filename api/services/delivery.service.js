const DeliveryRepository = require('../repositories/delivery.repository');

class DeliveryService {
    static async createDelivery(departure, theoricalArrival, idTruck,status) {
        try {
            return await DeliveryRepository.createDelivery(departure, theoricalArrival, idTruck,status);
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

module.exports = DeliveryService;
