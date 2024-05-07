const MaraudePoint = require('../models/maraudePoint.model');

class MaraudePointRepository {
    static async getAllMaraudePoints() {
        try {
            return await MaraudePoint.findAll();
        } catch (error) {
            console.error("MaraudePoint error :", error);
            throw error;
        }
    }

    static async getMaraudePointById(id) {
        try {
            return await MaraudePoint.findByPk(id);
        } catch (error) {
            console.error('MaraudePoint error :', error);
            throw error;
        }
    }

    static async addMaraudePoint(maraudePointData) {
        try {
            return await MaraudePoint.create(maraudePointData);
        } catch (error) {
            console.error("MaraudePoint error :", error);
            throw error;
        }
    }

    static async deleteMaraudePoint(id) {
        try {
            const maraudePoint = await MaraudePoint.findByPk(id);
            if (!maraudePoint) {
                console.error("MaraudePoint not found");
                throw new Error("MaraudePoint not found");
            }
            return await maraudePoint.destroy();
        } catch (error) {
            console.error("MaraudePoint error : ", error);
            throw error;
        }
    }
}

module.exports = MaraudePointRepository;