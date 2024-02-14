const express = require('express');
const StockController = require('../controllers/stock.controller');

const router = express.Router();

router.post('/', StockController.addStock);

module.exports = router;
