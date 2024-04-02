const DeliveryListingRepository = require('../repositories/deliveryListing.repository');
const ProductModel = require('../models/product.model');
const DeliveryModel = require('../models/delivery.model');

class DeliveryListingService {
    static async createDeliveryListing(id_product, id_delivery, departure, arrival) {
        try {
            const productExists = await ProductModel.findByPk(id_product);
            const deliveryExists = await DeliveryModel.findByPk(id_delivery);

            if (!productExists || !deliveryExists) {
                throw new Error('Les clés primaires ne sont pas valides');
            }

            return await DeliveryListingRepository.createDeliveryListing(id_product, id_delivery, departure, arrival);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    static async getAllDeliveryListings() {
        try {
            return await DeliveryListingRepository.findAllDeliveryListings();
        } catch (error) {
            throw error;
        }
    }

    static async deleteDeliveryListing(id_product, id_delivery) {
        try {
            await DeliveryListingRepository.deleteDeliveryListing(id_product, id_delivery);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DeliveryListingService;
