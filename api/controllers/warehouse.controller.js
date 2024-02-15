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
            const name  = req.params.name;
            if (!name) {
                return res.status(400).json({ error: 'Give name parameter' });
            }

            const warehouse = await WarehouseService.getWarehouseByName(name);
            if (!warehouse) {
                return res.status(404).json({ error: 'there is no warehouse with this name' });
            }

            res.json(warehouse);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error during warehouse get' });
        }
    }

    static async deleteWarehouse(req, res) {
        try {
            const warehouseId = req.params.id;
            await WarehouseService.deleteWarehouse(warehouseId);
            res.status(204).end();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = WarehouseController;
