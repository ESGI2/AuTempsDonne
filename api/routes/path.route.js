const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");
const PathController = require('../controllers/path.controller');

router.get('/',[authMiddleware, isAdmin], PathController.bestpath);

module.exports = router;
