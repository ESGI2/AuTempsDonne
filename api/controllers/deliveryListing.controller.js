const DeliveryListingService = require('../services/deliveryListing.service');

class DeliveryDriverController {
    static async createDeliveryListing(req, res) {
        const { id_product, id_delivery ,departure,arrival } = req.query;
        try {
            const newDeliveryDriver = await DeliveryListingService.createDeliveryListing(id_product, id_delivery ,departure,arrival);
            return res.json("delivery added");
        } catch (error) {
            return res.status(500).json({ error: 'Error during driver post' });
        }
    }
}

module.exports = DeliveryListingController;
