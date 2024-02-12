const express = require('express');
const TruckController = require('../controllers/truck.controller');

const router = express.Router();

router.post('/', TruckController.truckAdded);

module.exports = router;
