const DeliveryListingRepository = require('../repositories/deliveryListing.repository');

class DeliveryListingService {
    static async createDeliveryListing(id_product, id_delivery ,departure,arrival) {
        try {

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

    static async deleteDeliveryDriver(driverId) {
        try {
            return await DeliveryDriverRepository.deleteDeliveryDriver(driverId);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DeliveryDriverService;
