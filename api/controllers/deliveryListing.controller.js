const DeliveryListingService = require('../services/deliveryListing.service');

class DeliveryListingController {
    static async createDeliveryListing(req, res) {
        const { id_product, id_delivery, departure, arrival } = req.query;
        try {
            const newDeliveryListing = await DeliveryListingService.createDeliveryListing(id_product, id_delivery, departure, arrival);
            return res.status(201).json(newDeliveryListing);
        } catch (error) {
            return res.status(500).json({ error: 'Error during delivery listing creation' });
        }
    }

    static async getAllDeliveryListings(req, res) {
        try {
            const deliveryListings = await DeliveryListingService.getAllDeliveryListings();
            return res.status(200).json(deliveryListings);
        } catch (error) {
            return res.status(500).json({ error: 'Error during delivery listing get' });
        }
    }

    static async deleteDeliveryListing(req, res) {
        const { id_product, id_delivery } = req.query;
        try {
            await DeliveryListingService.deleteDeliveryListing(id_product, id_delivery);
            return res.status(200).json({ message: 'Delivery listing deleted ' });
        } catch (error) {
            return res.status(500).json({ error: 'Error during delivery listing delete' });
        }
    }
}

module.exports = DeliveryListingController;
