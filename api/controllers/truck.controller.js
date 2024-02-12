const TruckServices = require('../services/truck.services');

class TruckController {
    static async truckAdded(req, res) {
        try {
            const { name, localisation } = req.query;
            await TruckServices.addTruck({ name, localisation });
            res.status(201).json({ Message: "Truck added" });
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

    static async getTruckById(req, res) {
        try {
            const truckId = req.params.id;
            const truck = await TruckServices.getTruckById(truckId);

            if (!truck) {
                return res.status(404).json({ error: "Truck not found" });
            }
            res.status(200).json(truck);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error during truck get" });
        }
    }

    static async updateTruckLocalisation(req, res) {
        try {
            const { id } = req.query;
            const { localisation } = req.query;

            await TruckServices.updateTruckLocalisation(id, localisation);

            res.status(200).json({ message: 'Truck localisation updated successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = TruckController;
