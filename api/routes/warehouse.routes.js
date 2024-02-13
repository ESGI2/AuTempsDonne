const express = require('express');
const WarehouseController = require('../controllers/warehouse.controller');

const router = express.Router();

router.post('/', WarehouseController.addWarehouse);
router.get('/', WarehouseController.getAllWarehouses);

module.exports = router;
