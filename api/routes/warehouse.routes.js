const express = require('express');
const WarehouseController = require('../controllers/warehouse.controller');

const router = express.Router();

router.post('/', WarehouseController.addWarehouse);

module.exports = router;
