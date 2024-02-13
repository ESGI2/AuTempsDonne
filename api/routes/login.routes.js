const express = require('express');
const LoginController = require('../controllers/login.controller');

const router = express.Router();

router.get('/', LoginController.login);

module.exports = router;