const Warehouse = require('../models/warehouse.model');

class WarehouseRepository {
    static async addWarehouse(name, country, city, postal_code, road, road_number) {
        try {
            const newWarehouse = await Warehouse.create({ name, country, city, postal_code, road, road_number });
            return newWarehouse;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getAllWarehouses() {
        try {
            const warehouses = await Warehouse.findAll();
            return warehouses;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getWarehouseByName(name) {
        try {
            const warehouse = await Warehouse.findOne({name});
            return warehouse;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getWarehouseById(id) {
        try {
            const warehouse = await Warehouse.findByPk(id);
            return warehouse;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = WarehouseRepository;
