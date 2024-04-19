const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const DeliveryController = require('../controllers/delivery.controller');

router.post('/',authMiddleware, DeliveryController.createDelivery);
router.get('/',authMiddleware, DeliveryController.getAllDeliveries);
router.patch('/start/:id_delivery', authMiddleware, DeliveryController.UpdateStatus);
router.patch('/finish/:id_delivery/:id_product/:quantity', authMiddleware, DeliveryController.UpdateStatusFinish);
router.patch('/update-status/:id_delivery', authMiddleware, DeliveryController.UpdateStatusAdd1)


module.exports = router;
