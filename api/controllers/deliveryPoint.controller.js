const DeliveryPointService = require('../services/deliveryPoint.service');

class DeliveryPointController {
    static async createDeliveryPoint(req, res) {
        try {
            const { type, name, country, city, postal_code, road } = req.body;
            const newDeliveryPoint = await DeliveryPointService.createDeliveryPoint({ type, name, country, city, postal_code, road });
            return res.status(201).json(newDeliveryPoint);
        } catch (error) {
            return res.status(500).json({ error: 'Error during point creation' });
        }
    }

    static async getAllDeliveryPoints(req, res) {
        try {
            const deliveryPoints = await DeliveryPointService.getAllDeliveryPoints();
            return res.status(200).json(deliveryPoints);
        } catch (error) {
            return res.status(500).json({ error: 'Error during fetching delivery points' });
        }
    }

    static async deleteDeliveryPoint(req, res) {
        const pointId = req.params.id;
        try {
            await DeliveryPointService.deleteDeliveryPoint(pointId);
            return res.status(200).json({ message: 'Delivery point deleted successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Error during deletion of delivery point' });
        }
    }

}

module.exports = DeliveryPointController;
