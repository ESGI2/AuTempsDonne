const DeliveryListing = require('../models/deliveryListing.model');

class DeliveryListingRepository {
    static async create(id_delivery, id_point, isDeparture, isArrival) {
        try {
            return await DeliveryListing.create({ id_delivery, id_point, isDeparture, isArrival });
        } catch (error) {
            throw new Error('Error while creating delivery listing');
        }
    }

    static async addPassingPoint({ id_delivery, id_point, step }) {
        try {
            return await DeliveryListing.create({ id_delivery, id_point, step });
        } catch (error) {
            console.error("DeliveryPassing error :", error);
            throw error;
        }
    }


    static async findByDeliveryId(id_delivery) {
        try {
            return await DeliveryListing.findAll({
                where: {
                    id_delivery: id_delivery
                }
            });
        } catch (error) {
            throw new Error('Error while finding delivery listings by id_delivery');
        }
    }

    static async findByDeparture() {
        try {
            return await DeliveryListing.findAll({
                where: {
                    isDeparture: true
                }
            });
        } catch (error) {
            throw new Error('Error while finding departure delivery listings');
        }
    }

    static async findByArrival() {
        try {
            return await DeliveryListing.findAll({
                where: {
                    isArrival: true
                }
            });
        } catch (error) {
            throw new Error('Error while finding arrival delivery listings');
        }
    }
}

module.exports = DeliveryListingRepository;
