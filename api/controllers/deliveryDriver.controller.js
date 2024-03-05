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

    static async getAllDeliveryDrivers(req, res) {
        try {
            const drivers = await DeliveryDriverService.getAllDeliveryDrivers();
            return res.status(200).json(drivers);
        } catch (error) {
            return res.status(500).json({ error: 'Error during get driver' });
        }
    }

    static async deleteDeliveryDriver(req, res) {
        const driverId = req.params.id;
        try {
            await DeliveryDriverService.deleteDeliveryDriver(driverId);
            return res.json("Driver deleted successfully");
        } catch (error) {
            return res.status(500).json({ error: 'Error during driver delete' });
        }
    }

}

module.exports = DeliveryDriverController;
