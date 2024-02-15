const express = require('express');
const StockController = require('../controllers/stock.controller');
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post('/', authMiddleware ,StockController.addStock);
router.get('/', authMiddleware ,StockController.getStockQuantity);
router.get('/all', authMiddleware ,StockController.getAllStocks);

module.exports = router;
