const DeliveryProductService = require('../services/deliveryProduct.service');
const ProductService = require("../services/product.services");

class DeliveryProductController {
    static async addDeliveryProduct(req, res) {
        try {
            const { id_delivery, id_product, quantity } = req.body;

            if (!id_product || !id_delivery || !quantity) {
                return res.status(400).json({ error: 'Provide all necessary parameters' });
            }
            const newDeliveryProduct = await DeliveryProductService.addDeliveryProduct(id_product, id_delivery, quantity);
            return res.status(201).json(newDeliveryProduct);
        } catch (error) {
            return res.status(500).json({ error: 'Error while adding delivery product' });
        }
    }


    static async addDeliveryProductIfNotExist(req, res) {
        try {
            const { name , type , id_delivery, id_product, quantity } = req.body;

            if (!id_product || !id_delivery || !quantity || !name || !type) {
                return res.status(400).json({ error: 'Provide all necessary parameters' });
            }
            const donation = true

            const newProduct = await ProductService.addProduct(name, type, donation);

            


        } catch (error) {
            return res.status(500).json({ error: 'Error while adding delivery product' });
        }
    }

    static async getDeliveryProductsByDeliveryId(req, res) {
        try {
            const { id_delivery } = req.body;

            if (!id_delivery) {
                return res.status(400).json({ error: 'Provide a valid delivery ID' });
            }

            const deliveryProducts = await DeliveryProductService.getDeliveryProductsByDeliveryId(id_delivery);
            return res.json(deliveryProducts);
        } catch (error) {
            return res.status(500).json({ error: 'Error while fetching delivery products' });
        }
    }
}

module.exports = DeliveryProductController;
