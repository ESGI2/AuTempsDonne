const Delivery = require('../models/delivery.model');
const DeliveryProduct = require('../models/deliveryProduct.model');

class DeliveryRepository {
    static async createDelivery(departure, theoretical_arrival, id_truck,status) {
        try {
            return await Delivery.create({ departure, theoretical_arrival, id_truck,status });
        } catch (error) {
            console.log(error);
        }
    }

    static async updateStatus(id_delivery){
        try {

            const delivery = await Delivery.findByPk(id_delivery);
            if (!delivery) {
                throw new Error('Delivery not found');
            }

            if (delivery.status == 0 ) {
                const product = await DeliveryProduct.findByPk(id_delivery)

                console.log(product.quantity)
            }

            delivery.status = delivery.status + 1
            await delivery.save();

        } catch (error) {
            console.log(error)
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
