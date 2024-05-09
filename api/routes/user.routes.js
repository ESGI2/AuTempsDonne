const express = require('express');
const UserController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');
const checkIsResponsible = require('../middlewares/isResponsible');

const router = express.Router();

router.get('/', [authMiddleware , checkIsResponsible], UserController.getUsers);
router.get('/me', authMiddleware, UserController.getMe);
router.get('/logout', authMiddleware, UserController.logout);
router.delete('/:id', [authMiddleware, isAdmin], UserController.deleteUser);
router.put('/:id', [authMiddleware, isAdmin], UserController.editUser);
router.put('/password/:id', [authMiddleware, isAdmin], UserController.editPassword);
router.get('/volunteers', [authMiddleware, isAdmin], UserController.getVolunteers);
router.get('/newsletter-subscribers', [authMiddleware, isAdmin], UserController.getNewsletterSubscribers);


module.exports = router;