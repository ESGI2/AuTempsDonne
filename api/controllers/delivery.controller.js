const DeliveryService = require('../services/delivery.service');

class DeliveryController {
    static async createDelivery(req, res) {
        try {
            const { departure, theoricalArrival, idTruck } = req.query;


            if (!departure || !theoricalArrival || !idTruck) {
                return res.status(400).json({ error: 'Missing parameters' });
            }

            const newDelivery = await DeliveryService.createDelivery(departure, theoricalArrival, idTruck);
            return res.status(201).json(newDelivery);
        } catch (error) {
            console.error('Error creating delivery:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = DeliveryController;
