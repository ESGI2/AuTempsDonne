const DeliveryListingModel = require('../models/deliveryListing.model');

class DeliveryListingRepository {
    static async createDeliveryListing(id_product, id_delivery, departure, arrival) {
        try {
            const newDeliveryListing = await DeliveryListingModel.create({ id_product, id_delivery, departure, arrival });
            return newDeliveryListing;
        } catch (error) {
            throw error;
        }
    }
    static async findAllDeliveryListings() {
        try {
            return await DeliveryListingModel.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async deleteDeliveryListing(id_product, id_delivery) {
        try {
            await DeliveryListingModel.destroy({ where: { id_product, id_delivery } });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DeliveryListingRepository;
