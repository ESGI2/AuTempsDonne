const DeliveryPointRepository = require('../repositories/deliveryPoint.repository');

class DeliveryPointService {
    static async createDeliveryPoint(data) {
        try {
            return await DeliveryPointRepository.create(data);
        } catch (error) {
            throw new Error('Error while creating delivery point');
        }
    }

    static async getAllDeliveryPoints() {
        try {
            return await DeliveryPointRepository.findAll();
        } catch (error) {
            throw new Error('Error while fetching delivery points');
        }
    }

    static async deleteDeliveryPoint(pointId) {
        try {
            return await DeliveryPointRepository.delete(pointId);
        } catch (error) {
            throw new Error('Error while deleting delivery point');
        }
    }
}

module.exports = DeliveryPointService;
