const Delivery = require('../models/delivery.model');
const DeliveryProduct = require('../models/deliveryProduct.model');
const DeliveryListing = require('../models/deliveryListing.model');
const Warehouse = require('../models/warehouse.model');
const Stock = require('../models/Stock.model');

class DeliveryRepository {
    static async createDelivery(departure, theoretical_arrival, id_truck,status) {
        try {
            return await Delivery.create({ departure, theoretical_arrival, id_truck,status });
        } catch (error) {
            console.log(error);
        }
    }

    static async updateStatus( id_delivery , id_product , quantity){
        try {
            const delivery = await Delivery.findByPk(id_delivery);
            if (!delivery) {
                throw new Error('Delivery not found');
        }

            if (delivery.status == 0 ) {
                const product = await DeliveryProduct.findByPk(id_delivery)
                const point = await  DeliveryListing.findOne({where : { id_delivery : id_delivery , isDeparture : true  }})
                const id_point = point.id_point;
                const warehouse = await  Warehouse.findOne({where : { id_delivery_point : id_point}})
                const stock = await Stock.findOne({where : { id_warehouse : warehouse.id , id_product : id_product }})
                //////////////////////////////////////////////////////////////////////
                stock.quantity = stock.quantity - quantity
                stock.save()
            }

            if (delivery.status == 1 ) {
                const product = await DeliveryProduct.findByPk(id_delivery)
                const point = await  DeliveryListing.findOne({where : { id_delivery : id_delivery , isArrival : true  }})
                const id_point = point.id_point;
                const warehouse = await  Warehouse.findOne({where : { id_delivery_point : id_point}})
                const stock = await Stock.findOne({where : { id_warehouse : warehouse.id , id_product : id_product }})
                //////////////////////////////////////////////////////////////////////
                stock.quantity = stock.quantity + quantity
                await stock.save()
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
