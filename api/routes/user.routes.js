const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const UserController = require('../controllers/user.controller');

const router = express.Router();

router.get('/', UserController.getAllUsers);

module.exports = router;