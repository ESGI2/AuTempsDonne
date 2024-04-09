const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const DeliveryController = require('../controllers/delivery.controller');

router.post('/',authMiddleware, DeliveryController.createDelivery);
router.get('/',authMiddleware, DeliveryController.getAllDeliveries);
router.patch('/:id_delivery', authMiddleware, DeliveryController.UpdateStatus);


module.exports = router;
