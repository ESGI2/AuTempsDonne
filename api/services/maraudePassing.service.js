const MaraudePassingRepository = require('../repositories/maraudePassing.repository');
const MaraudePointService = require('./maraudePoint.service');

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

    static async getPointsDataByMaraude(id) {
        try {
            // Cette fonction doit renvoyer les points de passage d'une maraude avec les données des points associés
            const rawPassingPoints = await MaraudePassingRepository.getPassingPointByMaraudeId(id);

            const points = [];

            for (const passingPoint of rawPassingPoints) {
                const point = await MaraudePointService.getMaraudePointById(passingPoint.id_point);
                point.step = passingPoint.step;
                points.push(point);
            }

            // On trie le tableau en fonction de l'attribut step
            points.sort((a, b) => a.step - b.step);

            return points;
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