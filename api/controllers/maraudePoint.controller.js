const MaraudePointService = require('../services/maraudePoint.service');

class MaraudePointController {

    static async getAllMaraudePoints(req, res) {
        try {
            const maraudePoints = await MaraudePointService.getAllMaraudePoints();
            res.status(200).json(maraudePoints);
        } catch (error) {
            console.error(error);
            res.status(500).json({ "Error": "Error getting maraude points" });
        }
    }

    static async getMaraudePointById(req, res) {
        try {
            const id = req.params.id;
            const maraudePoint = await MaraudePointService.getMaraudePointById(id);
            if (!maraudePoint) {
                res.status(404).json({ "Error": "Maraude point not found" });
                return;
            }
            res.status(200).json(maraudePoint);
        } catch (error) {
            console.error(error);
            res.status(500).json({ "Error": "Error getting maraude point" });
        }
    }

    static async addMaraudePoint(req, res) {
        try {
            const maraudePointData = req.body;
            if (!maraudePointData.name || !maraudePointData.country || !maraudePointData.city || !maraudePointData.postal_code || !maraudePointData.road) {
                res.status(400).json({ "Error": "Missing parameters" });
                return;
            }
            const newMaraudePoint = await MaraudePointService.addMaraudePoint(maraudePointData);
            res.status(201).json({"Message" : "Maraude point added", newMaraudePoint});
        } catch (error) {
            console.error(error);
            res.status(500).json({ "Error": "Error adding maraude point" });
        }
    }

    static async deleteMaraudePoint(req, res) {
        try {
            const id = req.params.id;
            await MaraudePointService.deleteMaraudePoint(id);
            res.status(204).json({"Message" : "Maraude point deleted"});
        } catch (error) {
            console.error(error);
            res.status(500).json({ "Error": "Error deleting maraude point" });
        }
    }
}

module.exports = MaraudePointController;