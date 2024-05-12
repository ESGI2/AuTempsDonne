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

    static async findDeliveryLastStep(req, res) {
        try {
            const { delivery_id } = req.body;
            console.log(delivery_id)

            const deliveryLastStep = await DeliveryListingService.findDeliveryLastStep(delivery_id);
            return res.status(200).json(deliveryLastStep);
        } catch (error) {
            return res.status(500).json({ error: 'Error while finding last step of delivery listings' });
        }
    }



}

module.exports = DeliveryListingController;
