const MaraudePointRepository = require('../repositories/maraudePoint.repository');

class MaraudePointService {
    static async getAllMaraudePoints() {
        try {
            return await MaraudePointRepository.getAllMaraudePoints();
        } catch (error) {
            throw error;
        }
    }

    static async getMaraudePointById(id) {
        try {
            return await MaraudePointRepository.getMaraudePointById(id);
        } catch (error) {
            throw error;
        }
    }

    static async addMaraudePoint(maraudePoint) {
        try {

            const api_key = process.env.GEOCODE_API_KEY;

            const pre_data = {
                name: maraudePoint.name,
                country: maraudePoint.country,
                city: maraudePoint.city,
                postalcode: maraudePoint.postal_code,
                street: maraudePoint.road
            }

            const response = await fetch(`https://geocode.maps.co/search?q=${pre_data.street}+${pre_data.city}+${pre_data.country}&api_key=${api_key}`);
            const map_response = await response.json();

            const data = {
                name: maraudePoint.name,
                country: maraudePoint.country,
                city: maraudePoint.city,
                postal_code: maraudePoint.postal_code,
                road: maraudePoint.road,
                latitude: map_response[0].lat,
                longitude: map_response[0].lon
            }

            return await MaraudePointRepository.addMaraudePoint(data);
        } catch (error) {
            throw error;
        }
    }

    static async deleteMaraudePoint(id) {
        try {
            return await MaraudePointRepository.deleteMaraudePoint(id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = MaraudePointService;