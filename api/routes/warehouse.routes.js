const express = require('express');
const WarehouseController = require('../controllers/warehouse.controller');

const router = express.Router();

router.post('/', WarehouseController.addWarehouse);
router.get('/', WarehouseController.getAllWarehouses);
router.get('/:name', WarehouseController.getWarehouseByName);
router.delete('/:id', WarehouseController.deleteWarehouseById);

module.exports = router;
