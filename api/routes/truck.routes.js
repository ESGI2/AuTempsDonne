const express = require('express');
const TruckController = require('../controllers/truck.controller');
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post('/', authMiddleware , TruckController.truckAdded);
router.get('/', authMiddleware ,TruckController.getAllTrucks);
router.get('/:id', authMiddleware ,TruckController.getTruckById);
router.patch('/', authMiddleware ,TruckController.updateTruckLocalisation);
router.delete('/:id', authMiddleware, TruckController.deleteTruckById);

module.exports = router;
