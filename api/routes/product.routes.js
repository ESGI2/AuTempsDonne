const express = require('express');
const ProductController = require('../controllers/product.controller');

const router = express.Router();

router.post('/', ProductController.addProduct);
router.get('/', ProductController.getAllProducts);
router.delete('/:name', ProductController.deleteProductByName);

module.exports = router;
