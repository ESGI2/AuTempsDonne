const express = require('express');
const UserController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');
const checkIsResponsible = require('../middlewares/isResponsible');
const isMe = require('../middlewares/isMe');

const router = express.Router();

router.get('/', [authMiddleware , checkIsResponsible], UserController.getUsers);
router.delete('/:id', [authMiddleware, isAdmin], UserController.deleteUser);
router.get('/me', authMiddleware, UserController.getMe);
router.put('/:id', [authMiddleware , isMe], UserController.editUser);
router.get('/logout', authMiddleware, UserController.logout);
router.put('/password/:id', [authMiddleware, isMe], UserController.editPassword);
router.get('/volunteers', [authMiddleware, isAdmin], UserController.getVolunteers);
router.get('/newsletter-subscribers', [authMiddleware, isAdmin], UserController.getNewsletterSubscribers);


module.exports = router;