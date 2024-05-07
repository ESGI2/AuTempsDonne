const DeliveryListingService = require('../services/deliveryListing.service');

class DeliveryListingController {
    static async createDeliveryListing(req, res) {
        const { id_delivery, id_point, isDeparture, isArrival } = req.query;
        try {
            const newDeliveryListing = await DeliveryListingService.createDeliveryListing(id_delivery, id_point, isDeparture, isArrival);
            return res.status(201).json(newDeliveryListing);
        } catch (error) {
            return res.status(500).json({ error: 'Error during creation of delivery listing' });
        }
    }

    static async findByDeliveryId(req, res) {
        const { id } = req.params;
        try {
            const deliveryListings = await DeliveryListingService.findByDeliveryId(id);
            return res.status(200).json(deliveryListings);
        } catch (error) {
            return res.status(500).json({ error: 'Error while finding delivery listings' });
        }
    }

    static async findByDeparture(req, res) {
        try {
            const deliveryListings = await DeliveryListingService.findByDeparture();
            return res.status(200).json(deliveryListings);
        } catch (error) {
            return res.status(500).json({ error: 'Error while finding departure delivery listings' });
        }
    }

    static async findByArrival(req, res) {
        try {
            const deliveryListings = await DeliveryListingService.findByArrival();
            return res.status(200).json(deliveryListings);
        } catch (error) {
            return res.status(500).json({ error: 'Error while finding arrival delivery listings' });
        }
    }

}

module.exports = DeliveryListingController;
