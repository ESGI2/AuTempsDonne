const ProductRepository = require('../repositories/product.repository');
const StockService = require('../services/stock.service');

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

    static async getAllProducts() {
        try {
            return await ProductRepository.getAllProducts();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async deleteProductByName(name) {
        try {
            const product = await ProductRepository.getProductByName(name);
            if (!product) {
                throw new Error(`Product name not exist`);
            }

            await StockService.deleteStockByProductId(product.id);
            const deletedRows = await ProductRepository.deleteProductByName(name);
            return deletedRows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = ProductService;
