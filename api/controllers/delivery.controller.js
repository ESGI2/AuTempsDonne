const DeliveryService = require('../services/delivery.service');

class DeliveryController {
    static async createDelivery(req, res) {
        try {
            const { departure, theoretical_arrival, id_truck } = req.query;

            if (!departure || !theoretical_arrival || !id_truck) {
                return res.status(400).json({ error: 'Provide all parameters' });
            }

            const status = 0;
            const newDelivery = await DeliveryService.createDelivery(departure, theoretical_arrival, id_truck, status);
            return res.status(201).json(newDelivery);
        } catch (error) {
            return res.status(500).json({ error: 'Error during delivery post', details: error });
        }
    }

    static async UpdateStatus(req,res){
        const { id_delivery } = req.params;

        if (!id_delivery){
            return res.status(400).json({ error: 'Provide all parameters' });
        }
        try {
            const updateStatusDelivery = await DeliveryService.updateStatus(id_delivery);
            return res.status(201).json(updateStatusDelivery);
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
