const DeliveryListing = require('../models/deliveryListing.model');

class DeliveryListingRepository {
    static async create(id_delivery, id_point, isDeparture, isArrival) {
        try {
            return await DeliveryListing.create({ id_delivery, id_point, isDeparture, isArrival });
        } catch (error) {
            throw new Error('Error while creating delivery listing');
        }
    }

    static async addPassingPoint({ id_delivery, id_point, step }) {
        try {
            return await DeliveryListing.create({ id_delivery, id_point, step });
        } catch (error) {
            console.error("DeliveryPassing error :", error);
            throw error;
        }
    }


    static async findByDeliveryId(id_delivery) {
        try {
            return await DeliveryListing.findAll({
                where: {
                    id_delivery: id_delivery
                }
            });
        } catch (error) {
            throw new Error('Error while finding delivery listings by id_delivery');
        }
    }

    static async findDeliveryLastStep(delivery_id) {
        try {
            const lastStepDelivery = await DeliveryListing.findOne({
                where: {
                    id_delivery: delivery_id // Utilisation correcte du paramètre delivery_id
                },
                order: [['step', 'DESC']],
                limit: 1
            });

            if (lastStepDelivery) {
                return lastStepDelivery.id_point;
            } else {
                return null;
            }
        } catch (error) {
            throw new Error('Error while finding last step of delivery');
        }
    }



}

module.exports = DeliveryListingRepository;
