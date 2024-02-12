const TruckServices = require('../services/truck.services');

class TruckController {
    static async truckAdded(req, res) {
        try {
            const { name, localisation } = req.query;
            await TruckServices.addTruck({ name, localisation });
            res.status(201).json({ message: 'camion ajouter' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erreur du serveur' });
        }
    }
}

module.exports = TruckController;
