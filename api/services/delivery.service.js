const DeliveryRepository = require('../repositories/delivery.repository');

class DeliveryService {
    static async createDelivery(departure, theoretical_arrival, id_truck,status) {
        try {
            return await DeliveryRepository.createDelivery(departure, theoretical_arrival, id_truck,status);
        } catch (error) {
            throw error;
        }
    }

    static async updateStatus(id_delivery) {
        try {
            return await DeliveryRepository.updateStatus(id_delivery);
        } catch (error) {
            throw error;
        }
    }


    static async UpdateStatusFinish(id_delivery) {
        try {
            return await DeliveryRepository.UpdateStatusFinish(id_delivery);
        } catch (error) {
            throw error;
        }
    }


    static async getAllDeliveries() {
        try {
            const deliveries = await DeliveryRepository.getAllDeliveries();
            return deliveries;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DeliveryService;
