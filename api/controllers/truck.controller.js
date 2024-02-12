const TruckServices = require('../services/truck.services');

class TruckController {
    static async truckAdded(req, res) {
        try {
            const { name, localisation } = req.query;
            await TruckServices.addTruck({ name, localisation });
            res.status(201).json({ Message: 'Truck added' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ Error: "Error during Truck add" });
        }
    }

    static async getAllTrucks(req, res) {
        try {
            const trucks = await TruckServices.getAllTrucks();
            res.status(200).json(trucks);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error during truck get" });
        }
    }
}

module.exports = TruckController;
