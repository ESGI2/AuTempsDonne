const Product = require('../models/product.model');

class ProductRepository {
    static async addProduct(name, type, donation) {
        try {
            const newProduct = await Product.create({ name, type, donation });
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
            return await Product.findAll({ attributes: ['id', 'name', 'type', 'donation'] });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getProductById(id) {
        try {
            const product = await Product.findByPk(id);
            return product;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async deleteProductByName(name) {
        try {
            const deletedRows = await Product.destroy({ where: { name } });
            return deletedRows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getProductsByDonation(donationValue) {
        try {
            return await Product.findAll({ where: { donation: donationValue } });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = ProductRepository;
