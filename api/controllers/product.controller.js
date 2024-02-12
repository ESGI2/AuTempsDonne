const ProductService = require('../services/product.services');

class ProductController {
    static async addProduct(req, res) {
        try {
            const { name } = req.query;

            if (!name) {
                return res.status(400).json({ error: 'Add product name' });
            }

            const newProduct = await ProductService.addProduct(name);

            res.status(201).json(newProduct);
        } catch (error) {
            console.error(error);
            if (error.message === 'the product already exists') {
                return res.status(409).json({ error: 'the product already exists' });
            }
            res.status(500).json({ error: 'Error during product post' });
        }
    }
}

module.exports = ProductController;
