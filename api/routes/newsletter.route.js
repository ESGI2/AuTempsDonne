const express = require('express');
const NewsletterController = require('../controllers/newsletter.controller');

const router = express.Router();

router.post('/', NewsletterController.sendmail);

module.exports = router;