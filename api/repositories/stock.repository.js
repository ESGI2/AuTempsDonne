const Stock = require('../models/stock.model');

class StockRepository {
    static async addStock(id_product, id_warehouse, quantity) {
        try {
            const newStock = await Stock.create({
                id_product,
                id_warehouse,
                quantity
            });
            return newStock;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getStockQuantity(id_product, id_warehouse) {
        try {
            const stock = await Stock.findOne
            return stock.quantity;
        } catch (error) {({ where: { id_product: id_product, id_warehouse: id_warehouse } });
            console.error(error);
            throw error;
        }
    }

    static async getAllStocks() {
        try {
            const allStocks = await Stock.findAll();
            return allStocks;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async deleteStockByProductId(productId) {
        try {
            const deletedRows = await Stock.destroy({ where: { id_product: productId } });
            return deletedRows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = StockRepository;
