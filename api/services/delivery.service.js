const Delivery = require('../models/delivery.model');

class DeliveryService {
    static async createDelivery(departure, theoricalArrival, idTruck) {
        try {
            console.log(theoricalArrival)
            console.log(departure)
            console.log(idTruck)
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

module.exports = DeliveryService;
