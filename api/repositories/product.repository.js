const Product = require('../models/product.model');

class ProductRepository {
    static async addProduct(name) {
        try {
            const newProduct = await Product.create({ name });
            return newProduct;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getProductByName(name) {
        try {
            return await Product.findOne({ where: { name } });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getAllProducts() {
        try {
            return await Product.findAll();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = ProductRepository;
