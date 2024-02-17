const Delivery = require('../models/delivery.model');

class DeliveryRepository {
    static async createDelivery(departure, theoricalArrival, idTruck) {
        try {
            return await Delivery.create({
                departure: departure,
                theorical_arrival: theoricalArrival,
                id_truck: idTruck
            });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DeliveryRepository;
