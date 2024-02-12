const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const RegisterController = require('../controllers/register.controller');

const router = express.Router();

router.post('/beneficiary', RegisterController.registerBeneficiary);
router.post('/volunteer', RegisterController.registerVolunteer);

module.exports = router;