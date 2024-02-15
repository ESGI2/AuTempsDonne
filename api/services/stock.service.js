const StockRepository = require('../repositories/stock.repository');
const WarehouseRepository = require('../repositories/warehouse.repository');
const ProductRepository = require('../repositories/product.repository');

class StockService {
    static async addStock(id_product, id_warehouse, quantity) {
        try {
            const productExists = await ProductRepository.getProductById(id_product);
            if (!productExists) {
                throw new Error('No product found with this ID');
            }

            const warehouseExists = await WarehouseRepository.getWarehouseById(id_warehouse);
            if (!warehouseExists) {
                throw new Error('No warehouse found with this ID');
            }

            const newStock = await StockRepository.addStock(id_product, id_warehouse, quantity);
            return newStock;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async getStockQuantity(id_product, id_warehouse) {
        try {
            const stockQuantity = await StockRepository.getStockQuantity(id_product, id_warehouse);
            return stockQuantity;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = StockService;
