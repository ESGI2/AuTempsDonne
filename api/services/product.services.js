const ProductRepository = require('../repositories/product.repository');

class ProductService {
    static async addProduct(name) {
        try {
            const existingProduct = await ProductRepository.getProductByName(name);
            if (existingProduct) {
                throw new Error('the product already exists');
            }
            const newProduct = await ProductRepository.addProduct(name);
            return newProduct;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = ProductService;
