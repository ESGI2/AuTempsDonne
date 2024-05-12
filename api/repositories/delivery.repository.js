const Delivery = require('../models/delivery.model');
const DeliveryProduct = require('../models/deliveryProduct.model');
const DeliveryListing = require('../models/deliveryListing.model');
const Warehouse = require('../models/warehouse.model');
const Stock = require('../models/Stock.model');
const Maraude = require("../models/maraude.model");
const Stock = require('../models/stock.model');

class DeliveryRepository {
    static async addDelivery(deliveryData) {
        try {
            return await Delivery.create(deliveryData);
        }catch (error){
            console.error("Delivery error :", error);
            throw error;
        }
    }

    static async updateStatus(id_delivery) {
        try {
            const delivery = await Delivery.findByPk(id_delivery);
            if (!delivery) {
                throw new Error('Delivery not found');
            }

            if (delivery.status == 0) {
                const deliveryProducts = await DeliveryProduct.findAll({ where: { id_delivery: id_delivery } });

                for (const deliveryProduct of deliveryProducts) {
                    const { id_product, quantity } = deliveryProduct;
                    const point = await DeliveryListing.findOne({ where: { id_delivery: id_delivery, isDeparture: true } });
                    const id_point = point.id_point;
                    const warehouse = await Warehouse.findOne({ where: { id_delivery_point: id_point } });
                    const stock = await Stock.findOne({ where: { id_warehouse: warehouse.id, id_product: id_product } });

                    stock.quantity -= quantity;
                    await stock.save();

                    delivery.status = 1;
                    await delivery.save();
                }
            }
        } catch (error) {
            console.log(error);
        }
    }


    static async UpdateStatusFinish(id_delivery) {
        try {
            const delivery = await Delivery.findByPk(id_delivery);
            if (!delivery) {
                throw new Error('Delivery not found');
            }

            if (delivery.status == 1) {
                const point = await DeliveryListing.findOne({ where: { id_delivery: id_delivery, isArrival: true } });
                if (!point) {
                    throw new Error('Point not found');
                }
                const id_point = point.id_point;
                const warehouse = await Warehouse.findOne({ where: { id_delivery_point: id_point } });
                if (!warehouse) {
                    throw new Error('Warehouse not found');
                }

                const deliveryProducts = await DeliveryProduct.findAll({ where: { id_delivery: id_delivery } });

                for (const deliveryProduct of deliveryProducts) {
                    const { id_product, quantity } = deliveryProduct;
                    let stock = await Stock.findOne({ where: { id_warehouse: warehouse.id, id_product: id_product } });
                    if (!stock) {
                        stock = await Stock.create({ id_warehouse: warehouse.id, id_product: id_product, quantity: 0 });
                    }
                    stock.quantity += quantity;
                    await stock.save();

                    delivery.status = 2;
                    await delivery.save();
                }
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }



    static async getAllDeliveries() {
        try {
            const deliveries = await Delivery.findAll();
            return deliveries;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DeliveryRepository;
