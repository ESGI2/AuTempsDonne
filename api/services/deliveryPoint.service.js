const DeliveryPointRepository = require('../repositories/deliveryPoint.repository');

class DeliveryPointService {
    static async createDeliveryPoint(data) {
        try {
            const api_key = process.env.GEOCODE_API_KEY;
            const pre_data = {
                name: data.name,
                country: data.country,
                city: data.city,
                postalcode: data.postal_code,
                street: data.road
            };
            const response = await fetch(`https://geocode.maps.co/search?q=${pre_data.street}+${pre_data.city}+${pre_data.country}&api_key=${api_key}`);
            const map_response = await response.json();
            const newData = {
                ...data,
                lat: map_response[0].lat,
                lon: map_response[0].lon
            };
            return await DeliveryPointRepository.create(newData);
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
            await DeliveryPointRepository.deleteById(pointId);
        } catch (error) {
            throw new Error('Error while deleting delivery point');
        }
    }
}

module.exports = DeliveryPointService;
