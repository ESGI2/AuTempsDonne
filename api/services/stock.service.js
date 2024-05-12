const StockRepository = require('../repositories/stock.repository');
const WarehouseRepository = require('../repositories/warehouse.repository');
const ProductRepository = require('../repositories/product.repository');

class StockService {
    static async addStock(id_product, id_warehouse, quantity, dlc, date) {
        try {
            const productExists = await ProductRepository.getAllProducts(id_product);
            if (!productExists) {
                throw new Error('No product found with this ID');
            }

            const warehouseExists = await WarehouseRepository.getAllWarehouses(id_warehouse);
            if (!warehouseExists) {
                throw new Error('No warehouse found with this ID');
            }

            const dlcDate = new Date(dlc);
            const entryDate = new Date(date);
            const currentDate = new Date();

            if (entryDate < currentDate) {
                throw new Error('Entry date cannot be in the past.');
            }
            if (dlcDate < currentDate) {
                throw new Error('DLC cannot be in the past.');
            }

            if (dlcDate > entryDate) {
                throw new Error('DLC cannot be earlier than the date of product entry.');
            }

            const newStock = await StockRepository.addStock(id_product, id_warehouse, quantity, dlc, date);
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

    static async getAllStocks() {
        try {
            const allStocks = await StockRepository.getAllStocks();
            return allStocks;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async deleteStockByProductId(productId) {
        try {
            const deletedRows = await StockRepository.deleteStockByProductId(productId);
            return deletedRows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async updateStockQuantity(productId, warehouseId, quantityChange) {
        try {
            return await StockRepository.updateStockQuantity(productId, warehouseId, quantityChange);
        } catch (error) {
            throw error;
        }
    }

    static async getAllStockWarehouse(warehouseId){
        try{
            return await StockRepository.getAllStockWarehouse(warehouseId);
        } catch (error) {
        throw error;
    }

    }
}

module.exports = StockService;
