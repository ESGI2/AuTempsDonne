const DeliveryListingRepository = require('../repositories/deliveryListing.repository');

class DeliveryListingService {
    static async createDeliveryListing(id_delivery, id_point, isDeparture, isArrival) {

        try {
            return await DeliveryListingRepository.create(id_delivery, id_point, isDeparture, isArrival);
        } catch (error) {
            throw new Error('Error while creating delivery listing');
        }
    }

    static async findByDeliveryId(id_delivery) {
        try {
            return await DeliveryListingRepository.findByDeliveryId(id_delivery);
        } catch (error) {
            throw new Error('Error while finding delivery listings by id_delivery');
        }
    }

    static async findByDeparture() {
        try {
            return await DeliveryListingRepository.findByDeparture();
        } catch (error) {
            throw new Error('Error while finding departure delivery listings');
        }
    }

    static async findByArrival() {
        try {
            return await DeliveryListingRepository.findByArrival();
        } catch (error) {
            throw new Error('Error while finding arrival delivery listings');
        }
    }
}

module.exports = DeliveryListingService;
