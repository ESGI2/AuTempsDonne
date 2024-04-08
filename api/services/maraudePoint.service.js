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
            return await MaraudePointRepository.addMaraudePoint(maraudePoint);
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