const express = require('express');
const UserController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');

const router = express.Router();

router.get('/', [authMiddleware, isAdmin], UserController.getUsers);
router.delete('/:id', [authMiddleware, isAdmin], UserController.deleteUser);
router.put('/:id', [authMiddleware, isAdmin], UserController.editUser);
router.put('/password/:id', [authMiddleware, isAdmin], UserController.editPassword);

module.exports = router;