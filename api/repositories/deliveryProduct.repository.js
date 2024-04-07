const DeliveryProduct = require('../models/deliveryProduct.model');

class DeliveryProductRepository {
    static async addDeliveryProduct(id_product, id_delivery, quantity) {
        try {
            return await DeliveryProduct.create({id_product,id_delivery,quantity});
        } catch (error) {
            console.log(error);
        }
    }

    static async getDeliveryProductsByDeliveryId(id_delivery) {
        console.log(id_delivery)
        try {
            return await DeliveryProduct.findAll({where:{id_delivery}});
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DeliveryProductRepository;
