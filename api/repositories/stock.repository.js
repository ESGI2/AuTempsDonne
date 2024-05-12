const Stock = require('../models/stock.model');

class StockRepository {
    static async addStock(id_product, id_warehouse, quantity, dlc, date) {
        try {
            const newStock = await Stock.create({
                id_product,
                id_warehouse,
                quantity,
                dlc,
                date
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
            console.log(allStocks)
            console.log("aaaaaaaaaa")
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

    static async updateStockQuantity(productId, warehouseId, quantityChange) {
        try {
            const stock = await Stock.findOne({ where: { id_product: productId, id_warehouse: warehouseId } });
            if (!stock) {
                throw new Error('Stock not found');
            }

            stock.quantity += quantityChange;
            await stock.save();

            return stock;
        } catch (error) {
            throw error;
        }
    }

    static async getAllStockWarehouse(warehouseId){
        try {
            const stock = await Stock.findAll({where : { id_warehouse : warehouseId  }});
            return stock;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = StockRepository;
