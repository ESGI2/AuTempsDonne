const express = require('express');
const ProductController = require('../controllers/product.controller');
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post('/',authMiddleware ,ProductController.addProduct);
router.get('/', authMiddleware ,ProductController.getAllProducts);
router.delete('/:name',authMiddleware ,ProductController.deleteProductByName);

module.exports = router;
