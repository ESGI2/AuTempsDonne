const DeliveryDriverService = require('../services/deliveryDriver.service');

class DeliveryDriverController {
    static async createDeliveryDriver(req, res) {
        const { id_user, id_delivery } = req.query;
        try {
            const newDeliveryDriver = await DeliveryDriverService.createDeliveryDriver(id_user, id_delivery);
            return res.json("Driver added");
        } catch (error) {
            return res.status(500).json({ error: 'Error during driver post' });
        }
    }

}

module.exports = DeliveryDriverController;
