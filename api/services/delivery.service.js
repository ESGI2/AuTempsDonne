const DeliveryRepository = require('../repositories/delivery.repository');

class DeliveryService {
    static async addDelivery(deliveryData) {
        return DeliveryRepository.addDelivery(deliveryData);
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
