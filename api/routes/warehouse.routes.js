const express = require('express');
const WarehouseController = require('../controllers/warehouse.controller');
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get('/ByDeliveryPoint', authMiddleware ,WarehouseController.getWarehouseIdByDeliveryPoint);
router.post('/',authMiddleware, WarehouseController.addWarehouse);
router.get('/:name', authMiddleware ,WarehouseController.getWarehouseByName);
router.get('/',authMiddleware,  WarehouseController.getAllWarehouses);
router.delete('/:id', authMiddleware ,WarehouseController.deleteWarehouse);

module.exports = router;
