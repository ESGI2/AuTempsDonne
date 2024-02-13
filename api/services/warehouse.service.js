const WarehouseRepository = require('../repositories/warehouse.repository');

class WarehouseService {
    static async addWarehouse(name, country, city, postal_code, road, road_number) {
        try {
            // Ajouter un nouvel entrepôt
            const newWarehouse = await WarehouseRepository.addWarehouse(name, country, city, postal_code, road, road_number);
            return newWarehouse;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = WarehouseService;
