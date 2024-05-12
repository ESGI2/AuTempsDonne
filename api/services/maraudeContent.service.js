const MaraudeContentRepository = require('../repositories/maraudeContent.repository');
const ProductRepository = require('../repositories/product.repository');
const ProductService = require("./product.services");

class MaraudeContentService {

        static async getAll() {
            try {
                return await MaraudeContentRepository.getAll();
            } catch (error) {
                throw error;
            }
        }

        static async getProductByMaraude(id) {
            try {
                const product = await MaraudeContentRepository.getByMaraude(id);

                let content = [];
                for (let i = 0; i < product.length; i++) {
                    const productData = await ProductService.getProductById(product[i].id_product);
                    content.push({
                        id: productData.id,
                        name: productData.name,
                        type: productData.type,
                        quantity: product[i].quantity
                    });
                }

                return content;
            } catch (error) {
                throw error;
            }
        }

        static async create({ id_maraude, id_product, quantity }) {
            try {
                return await MaraudeContentRepository.create({ id_maraude, id_product, quantity });
            } catch (error) {
                throw error;
            }
        }

        static async delete(id) {
            try {
                return await MaraudeContentRepository.delete(id);
            } catch (error) {
                throw error;
            }
        }

        static async update(id, { id_maraude, id_product, quantity }) {
            try {
                return await MaraudeContentRepository.update(id, { id_maraude, id_product, quantity });
            } catch (error) {
                throw error;
            }
        }

        // This method take a list of product associated to a quantity and fill the maraude with it
        // Create a new entry in the maraudeContent table for each product
        static async fillMaraude(products) {
            for (let i = 0; i < products.length; i++) {
                try {
                    if (!products[i].id_maraude || !products[i].id_product || !products[i].quantity) {
                        console.log('Missing parameters');
                        return;
                    }
                    const product = await ProductRepository.getProductById(products[i].id_product);
                    if (!product) {
                        console.log('Product not found');
                        return;
                    }
                    await MaraudeContentRepository.create(products[i]);
                } catch (error) {
                    throw error;
                }
            }
        }
}

module.exports = MaraudeContentService;