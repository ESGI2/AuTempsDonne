const express = require('express');
const router = express.Router();
const ChildController = require('../controllers/child.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');

router.get('/',[authMiddleware, isAdmin], ChildController.getAllChildren);
router.get('/:id',[authMiddleware, isAdmin], ChildController.getChildById);
router.post('/',[authMiddleware, isAdmin], ChildController.addChild);
router.put('/:id',[authMiddleware, isAdmin], ChildController.updateChild);
router.delete('/:id',[authMiddleware, isAdmin], ChildController.deleteChild);

module.exports = router;