const WarehouseService = require('../services/warehouse.service');

class WarehouseController {
    static async addWarehouse(req, res) {
        try {
            const { name, country, city, postal_code, road, road_number } = req.query;

            if (!name || !country || !city || !postal_code || !road || !road_number) {
                return res.status(400).json({ error: 'Give all parameter' });
            }

            const newWarehouse = await WarehouseService.addWarehouse(name, country, city, postal_code, road, road_number);
            res.status(201).json(newWarehouse);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Can't patch warehouse" });
        }
    }

    static async getAllWarehouses(req, res) {
        try {
            const warehouses = await WarehouseService.getAllWarehouses();
            res.json(warehouses);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error during warehouse get' });
        }
    }

    static async getWarehouseByName(req, res) {
        try {
            const name = req.params.name;
            if (!name) {
                return res.status(400).json({ error: 'Give name parameter' });
            }
            const warehouse = await WarehouseService.getWarehouseByName(name);
            if (!warehouse) {
                return res.status(404).json({ error: 'No warehouse found with this name' });
            }
            res.json(warehouse);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error during warehouse get' });
        }
    }

    static async deleteWarehouseById(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ error: 'Give id parameter' });
            }

            await WarehouseService.deleteWarehouseById(id);

            res.json({ message: 'Warehouse delete !' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error during warehouse delete' });
        }
    }

}

module.exports = WarehouseController;
