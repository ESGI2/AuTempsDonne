const DeliveryListingModel = require('../models/deliveryListing.model');

class DeliveryListingRepository {
    static async createDeliveryListing(id_product, id_delivery, departure, arrival) {
        try {
            console.log(id_product)
            const newDeliveryListing = await DeliveryListingModel.create({ id_product, id_delivery, departure, arrival });
            return newDeliveryListing;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DeliveryListingRepository;
