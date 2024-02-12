const express = require('express');
const TruckController = require('../controllers/truck.controller');

const router = express.Router();

router.post('/', TruckController.truckAdded);
router.get('/', TruckController.getAllTrucks);
router.get('/:id', TruckController.getTruckById);

module.exports = router;
