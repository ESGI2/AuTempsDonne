const DeliveryProductRepository = require('../repositories/deliveryProduct.repository');

class DeliveryProductService {
    static async addDeliveryProduct(id_product, id_delivery, quantity) {
        try {
            return await DeliveryProductRepository.addDeliveryProduct(id_product, id_delivery, quantity);
        } catch (error) {
            throw error;
        }
    }

    static async getDeliveryProductsByDeliveryId(id_delivery) {

        try {
            return await DeliveryProductRepository.getDeliveryProductsByDeliveryId(id_delivery);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DeliveryProductService;
