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

    static async getStockQuantity(req, res) {
        try {
            const { id_product, id_warehouse } = req.query;
            if (!id_product || !id_warehouse ) {
                return res.status(400).json({ error: "Give all parameter" });
            }
            const stockQuantity = await StockService.getStockQuantity(id_product, id_warehouse);
            console.log(stockQuantity);
            if (stockQuantity == null){
                return res.status(404).json({ error: "No stock found with the given parameters" });
            }
            res.status(200).json({ quantity: stockQuantity });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error during stock get' });
        }
    }

    static async getAllStocks(req, res) {
        try {
            const allStocks = await StockService.getAllStocks();
            res.status(200).json(allStocks);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error during stock get' });
        }
    }
}

module.exports = StockController;
