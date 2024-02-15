const express = require('express');
const UserController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');

const router = express.Router();

router.get('/', [authMiddleware, isAdmin], UserController.getAllUsers);

module.exports = router;