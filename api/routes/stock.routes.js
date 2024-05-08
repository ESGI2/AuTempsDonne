const express = require('express');
const StockController = require('../controllers/stock.controller');
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get('/all', authMiddleware ,StockController.getAllStocks);
router.post('/', authMiddleware ,StockController.addStock);
router.get('/', authMiddleware ,StockController.getStockQuantity);
router.patch('/:productId/:warehouseId/:quantity', authMiddleware , StockController.updateStockQuantity);
router.get('/:warehouseId', authMiddleware ,StockController.getStockQuantityByWarehouseId);

module.exports = router;
