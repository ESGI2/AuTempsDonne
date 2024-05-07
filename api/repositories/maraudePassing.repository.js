const MaraudePassing = require('../models/maraudePassing.model');

class MaraudePassingRepository {
    static async getAllPassingPoints() {
        try {
            return await MaraudePassing.findAll();
        } catch (error) {
            console.error("MaraudePassing error :", error);
            throw error;
        }
    }

    static async getPassingPointByMaraudeId(id) {
        try {
            return await MaraudePassing.findAll({ where: { id_maraude: id } });
        } catch (error) {
            console.error("MaraudePassing error :", error);
            throw error;
        }
    }

    static async getPassingPointByPointId(id) {
        try {
            return await MaraudePassing.findAll({ where: { id_point: id } });
        } catch (error) {
            console.error("MaraudePassing error :", error);
            throw error;
        }
    }

    static async getPassingPointByMaraudeAndPoint(id_maraude, id_point) {
        try {
            return await MaraudePassing.findAll({ where: { id_maraude: id_maraude, id_point: id_point } });
        } catch (error) {
            console.error("MaraudePassing error :", error);
            throw error;
        }
    }

    static async addPassingPoint({ id_maraude, id_point, step }) {
        try {
            return await MaraudePassing.create({ id_maraude, id_point, step });
        } catch (error) {
            console.error("MaraudePassing error :", error);
            throw error;
        }
    }

    static async deletePassingPoint(id) {
        try {
            const maraudePassing = await MaraudePassing.findByPk(id);
            if (!maraudePassing) {
                console.error("MaraudePassing not found");
                throw new Error("MaraudePassing not found");
            }
            return await maraudePassing.destroy();
        } catch (error) {
            console.error("MaraudePassing error : ", error);
            throw error;
        }
    }
}

module.exports = MaraudePassingRepository;