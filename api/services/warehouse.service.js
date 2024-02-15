const WarehouseRepository = require('../repositories/warehouse.repository');

class WarehouseService {
    static async addWarehouse(name, country, city, postal_code, road, road_number) {
        try {
            const newWarehouse = await WarehouseRepository.addWarehouse(name, country, city, postal_code, road, road_number);
            return newWarehouse;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getAllWarehouses() {
        try {
            const warehouses = await WarehouseRepository.getAllWarehouses();
            return warehouses;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getWarehouseByName(name) {
        try {
            const warehouse = await WarehouseRepository.getWarehouseByName(name);
            console.log(warehouse);
            return warehouse;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async deleteWarehouse(warehouseId) {
        try {
            await WarehouseRepository.deleteWarehouse(warehouseId);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = WarehouseService;
