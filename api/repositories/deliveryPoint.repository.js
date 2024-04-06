const DeliveryPoint = require('../models/deliveryPoint.model');

class DeliveryPointRepository {
    static async create(data) {
        try {
            return await DeliveryPoint.create(data);
        } catch (error) {
            throw new Error('Error while creating delivery point');
        }
    }

    static async findAll() {
        try {
            return await DeliveryPoint.findAll();
        } catch (error) {
            throw new Error('Error while fetching delivery points');
        }
    }

    static async findById(pointId) {
        try {
            return await DeliveryPoint.findByPk(pointId);
        } catch (error) {
            throw new Error('Error while finding delivery point by ID');
        }
    }

    static async delete(pointId) {
        try {
            const pointToDelete = await DeliveryPoint.findByPk(pointId);
            if (!pointToDelete) {
                throw new Error('Delivery point not found');
            }
            await pointToDelete.destroy();
            return true;
        } catch (error) {
            throw new Error('Error while deleting delivery point');
        }
    }
}

module.exports = DeliveryPointRepository;
