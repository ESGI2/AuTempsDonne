const express = require('express');
const authMiddleware = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");
const router = express.Router();
const MaraudePassing = require('../controllers/maraudePassing.controller');

router.get('/', [authMiddleware, isAdmin], MaraudePassing.getPassingPoint);
router.post('/',[authMiddleware, isAdmin], MaraudePassing.addPassingPoint);
router.delete('/:id',[authMiddleware, isAdmin], MaraudePassing.deletePassingPoint);

module.exports = router;
