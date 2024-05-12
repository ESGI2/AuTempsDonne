const ProductService = require('../services/product.services');

class ProductController {
    static async addProduct(req, res) {
        try {
            const { name, type, donation, ean } = req.query;
            if (!name || !type || donation === undefined || !ean) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const newProduct = await ProductService.addProduct(name, type, donation, ean);

            res.status(201).json(newProduct);
        } catch (error) {
            console.error(error);
            if (error.message === 'The product already exists') {
                return res.status(409).json({ error: 'The product already exists' });
            }
            res.status(500).json({ error: 'Error during product post' });
        }
    }

    static async getProductById(req, res) {
        try {
            const { id } = req.params;
            const product = await ProductService.getProductById(id);
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ message: `Product with ID ${id} not found.` });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error during product get by ID' });
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
            } else {
                res.status(404).json({ message: `Product ${name} not found.` });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error during product delete' });
        }
    }

    static async getProductsByDonation(req, res) {
        try {
            const { donation } = req.query; // Use query to filter by donation status
            const products = await ProductService.getProductsByDonation(donation);
            res.status(200).json(products);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error during product get by donation' });
        }
    }

}

module.exports = ProductController;
