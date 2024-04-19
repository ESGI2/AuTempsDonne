const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const DeliveryController = require('../controllers/delivery.controller');

router.post('/',authMiddleware, DeliveryController.createDelivery);
router.get('/',authMiddleware, DeliveryController.getAllDeliveries);
router.patch('/start/:id_delivery', authMiddleware, DeliveryController.UpdateStatus);
router.patch('/finish/:id_delivery', authMiddleware, DeliveryController.UpdateStatusFinish);

module.exports = router;
