const MaraudePassingRepository = require('../repositories/maraudePassing.repository');

class MaraudePassingService {
    static async getAllPassingPoints() {
        try {
            return await MaraudePassingRepository.getAllPassingPoints();
        } catch (error) {
            throw error;
        }
    }

    static async getPassingPointByMaraude(id) {
        try {
            return await MaraudePassingRepository.getPassingPointByMaraudeId(id);
        } catch (error) {
            throw error;
        }
    }

    static async getPassingPointByPoint(id) {
        try {
            return await MaraudePassingRepository.getPassingPointByPointId(id);
        } catch (error) {
            throw error;
        }
    }

    static async getPassingPointByMaraudeAndPoint(id_maraude, id_point) {
        try {
            return await MaraudePassingRepository.getPassingPointByMaraudeAndPoint(id_maraude, id_point);
        } catch (error) {
            throw error;
        }
    }

    static async addPassingPoint({ id_maraude, id_point, step }) {
        try {
            return await MaraudePassingRepository.addPassingPoint({ id_maraude, id_point, step });
        } catch (error) {
            throw error;
        }
    }

    static async deletePassingPoint(id) {
        try {
            return await MaraudePassingRepository.deletePassingPoint(id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = MaraudePassingService;