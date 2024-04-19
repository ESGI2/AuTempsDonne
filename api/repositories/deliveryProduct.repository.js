const DeliveryProduct = require('../models/deliveryProduct.model');
const Delivery = require('../models/delivery.model');

class DeliveryProductRepository {
    static async addDeliveryProduct(id_product, id_delivery, quantity) {
        try {
            return await DeliveryProduct.create({id_product,id_delivery,quantity});
        } catch (error) {
            console.log(error);
        }
    }

    static async getDeliveryProductsByDeliveryId(deliveryId) {
        try {
            const delivery = await Delivery.findByPk(deliveryId);
            if (!delivery) {
                throw new Error('Delivery not found');
            }

            const status = delivery.status;
            if (status === 2) {
                throw new Error('Delivery status is 2');
            }

            const deliveryProducts = await DeliveryProduct.findAll({
                where: {
                    id_delivery: deliveryId
                }
            });
            return deliveryProducts;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DeliveryProductRepository;
