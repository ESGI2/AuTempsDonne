const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const DeliveryController = require('../controllers/delivery.controller');

router.post('/',authMiddleware, DeliveryController.createDelivery);
router.get('/', DeliveryController.getAllDeliveries);

module.exports = router;
