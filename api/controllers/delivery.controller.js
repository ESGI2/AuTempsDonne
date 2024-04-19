const DeliveryService = require('../services/delivery.service');
const Delivery = require('../models/delivery.model');

class DeliveryController {
    static async createDelivery(req, res) {
        try {
            const { departure, theoretical_arrival, id_truck } = req.query;

            if (!departure || !theoretical_arrival || !id_truck) {
                return res.status(400).json({ error: 'Provide all parameters' });
            }

            const status = 0;
            const newDelivery = await DeliveryService.createDelivery(departure, theoretical_arrival, id_truck, status);
            return res.status(201).json(newDelivery);
        } catch (error) {
            return res.status(500).json({ error: 'Error during delivery post', details: error });
        }
    }

    static async UpdateStatus(req, res) {
        const { id_delivery } = req.params;

        if (!id_delivery) {
            return res.status(400).json({ error: 'Provide delivery ID' });
        }

        try {
            const updateStatusDelivery = await DeliveryService.updateStatus(id_delivery);
            return res.status(201).json(updateStatusDelivery);
        } catch (error) {
            return res.status(500).json({ error: 'Error during delivery post' });
        }
    }


    static async UpdateStatusFinish(req,res){
        const { id_delivery , id_product , quantity} = req.params;

        if ( !id_delivery || !id_product || !quantity){
            return res.status(400).json({ error: 'Provide all parameters' });
        }
        try {
            const updateStatusDelivery = await DeliveryService.UpdateStatusFinish( id_delivery , id_product , quantity);
            return res.status(201).json(updateStatusDelivery);
        } catch (error) {
            return res.status(500).json({ error: 'Error during delivery post' });
        }
    }




    static async UpdateStatusAdd1(req,res){
        const { id_delivery } = req.params;

        if ( !id_delivery ){
            return res.status(400).json({ error: 'Provide all parameters' });
        }

        try {
            const delivery = await Delivery.findByPk(id_delivery);
            delivery.status = delivery.status + 1
            await delivery.save();
            return res.status(201).json(delivery.status);
        } catch (error) {
            return res.status(500).json({ error: 'Error during delivery post' });
        }
    }


    static async getAllDeliveries(req, res) {
        try {
            const deliveries = await DeliveryService.getAllDeliveries();
            return res.json(deliveries);
        } catch (error) {
            return res.status(500).json({ error: 'Error during delivery get' });
        }
    }
}

module.exports = DeliveryController;
