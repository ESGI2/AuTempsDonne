const Warehouse = require('../models/warehouse.model');
const Stock = require('../models/stock.model');

class WarehouseRepository {
    static async addWarehouse(name, country, city, postal_code, road) {
        try {
            const newWarehouse = await Warehouse.create({ name, country, city, postal_code, road });
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

    static async deleteWarehouse(warehouseId) {
        try {
            await Stock.destroy({
                where: {
                    id_warehouse: warehouseId
                }
            });

            await Warehouse.destroy({
                where: {
                    id: warehouseId
                }
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = WarehouseRepository;
