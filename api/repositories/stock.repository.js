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
}

module.exports = StockRepository;
