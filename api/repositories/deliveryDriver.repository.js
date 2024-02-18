const DeliveryDriver = require('../models/deliveryDriver.model');

class DeliveryDriverRepository {
    static async createDeliveryDriver(id_user, id_delivery) {
        try {
            const newDeliveryDriver = await DeliveryDriver.create({ id_user, id_delivery });
            return newDeliveryDriver;
        } catch (error) {
            throw error;
        }
    }

    static async findByDeliveryId(id_delivery) {
        try {
            return await DeliveryDriver.findOne({ where: { id_delivery } });
        } catch (error) {
            throw error;
        }
    }

    static async findAll() {
        try {
            return await DeliveryDriver.findAll();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DeliveryDriverRepository;
