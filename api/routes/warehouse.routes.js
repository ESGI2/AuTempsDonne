const express = require('express');
const WarehouseController = require('../controllers/warehouse.controller');
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post('/',authMiddleware, WarehouseController.addWarehouse);
router.get('/',authMiddleware,  WarehouseController.getAllWarehouses);
router.get('/:name', authMiddleware ,WarehouseController.getWarehouseByName);
router.delete('/:id', authMiddleware ,WarehouseController.deleteWarehouse);

module.exports = router;
