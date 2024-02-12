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

    static async updateTruckLocation(req, res) {
        try {
            const { id } = req.query;
            const { location } = req.query;

            await TruckServices.updateTruckLocation(id, location);

            res.status(200).json({ message: "Truck location updated successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error during localisation patch" });
        }
    }
}

module.exports = TruckController;
