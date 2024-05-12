const DeliveryListingRepository = require('../repositories/deliveryListing.repository');
const MaraudePassing = require("../models/maraudePassing.model");
const MaraudePassingRepository = require("../repositories/maraudePassing.repository");

class DeliveryListingService {
    static async createDeliveryListing(id_delivery, id_point, isDeparture, isArrival) {

        try {
            return await DeliveryListingRepository.create(id_delivery, id_point, isDeparture, isArrival);
        } catch (error) {
            throw new Error('Error while creating delivery listing');
        }
    }

    static async addPassingPoint({ id_delivery, id_point, step }) {
        try {
            return await DeliveryListingRepository.addPassingPoint({ id_delivery, id_point, step });
        } catch (error) {
            throw error;
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
