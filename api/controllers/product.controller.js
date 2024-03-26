const ProductService = require('../services/product.services');

class ProductController {
    static async addProduct(req, res) {
        try {
            const { name, type, donation } = req.query;

            if (!name || !type || donation === undefined) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const newProduct = await ProductService.addProduct(name, type, donation);

            res.status(201).json(newProduct);
        } catch (error) {
            console.error(error);
            if (error.message === 'the product already exists') {
                return res.status(409).json({ error: 'the product already exists' });
            }
            res.status(500).json({ error: 'Error during product post' });
        }
    }

    static async getAllProducts(req, res) {
        try {
            const products = await ProductService.getAllProducts();
            res.status(200).json(products);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error during product get' });
        }
    }

    static async deleteProductByName(req, res) {
        try {
            const { name } = req.params;
            const deletedProduct = await ProductService.deleteProductByName(name);
            if (deletedProduct === 1) {
                res.status(200).json({ message: `Product ${name} deleted successfully.` });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error during product delete' });
        }
    }

    static async getProductsByDonation(req, res) {
        try {
            const products = await ProductService.getProductsByDonation(1);
            res.status(200).json(products);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error during product get by donation' });
        }
    }

}

module.exports = ProductController;
