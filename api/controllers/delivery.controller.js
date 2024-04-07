const DeliveryService = require('../services/delivery.service');

class DeliveryController {
    static async createDelivery(req, res) {
        try {
            const { departure, theoricalArrival, idTruck } = req.query;

            if (!departure || !theoricalArrival || !idTruck) {
                return res.status(400).json({ error: 'Give all parameters' });
            }
            const status = 0;
            const newDelivery = await DeliveryService.createDelivery(departure, theoricalArrival, idTruck, status);
            return res.status(201).json(newDelivery);
        } catch (error) {
            return res.status(500).json({ error: 'Error during delivery post' });
        }
    }

    static async getAllDeliveries(req, res) {
        try {
            const deliveries = await DeliveryService.getAllDeliveries();
            return res.json(deliveries);
        } catch (error) {
            return res.status(500).json({ error: 'Error during delivery get' });
        }
    }
}

module.exports = DeliveryController;
