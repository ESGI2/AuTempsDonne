const express = require('express');
const NewsletterController = require('../controllers/newsletter.controller');
const authMiddleware = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");

const router = express.Router();

router.post('/', [authMiddleware, isAdmin] , NewsletterController.sendmail);

module.exports = router;
