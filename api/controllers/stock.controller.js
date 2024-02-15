const StockService = require('../services/stock.service');

class StockController {
    static async addStock(req, res) {
        try {
            const { id_product, id_warehouse, quantity } = req.query;
            const newStock = await StockService.addStock(id_product, id_warehouse, quantity);
            res.status(201).json(newStock);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error during stock post' });
        }
    }
}

module.exports = StockController;
