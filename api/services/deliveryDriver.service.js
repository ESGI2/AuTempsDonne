const DeliveryDriverRepository = require('../repositories/deliveryDriver.repository');

class DeliveryDriverService {
    static async createDeliveryDriver(id_user, id_delivery) {
        try {
            const existingDriver = await DeliveryDriverRepository.findByDeliveryId(id_delivery);
            if (existingDriver) {
                throw new Error('il ne peut pas y avoir plusieur conducteur pour la meme livraison ...');
            }

            return await DeliveryDriverRepository.createDeliveryDriver(id_user, id_delivery);
        } catch (error) {
            throw error;
        }
    }

    static async getAllDeliveryDrivers() {
        try {
            return await DeliveryDriverRepository.findAll();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DeliveryDriverService;
