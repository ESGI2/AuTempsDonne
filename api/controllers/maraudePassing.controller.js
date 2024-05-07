const MaraudePassingService = require('../services/maraudePassing.service');

class MaraudePassingController {

        static async getPassingPoint(req, res) {
            try {
                // Get data into query if it exists
                // If not, get all passing points
                // If maraude_id exists, get passing points for this maraude
                // If point_id exists, get passing points for this point

                const maraude_id = req.query.maraude_id;
                const point_id = req.query.point_id;
                let passingPoints;
                if (maraude_id) {
                    passingPoints = await MaraudePassingService.getPassingPointByMaraude(maraude_id);
                } else if (point_id) {
                    passingPoints = await MaraudePassingService.getPassingPointByPoint(point_id);
                } else if (maraude_id && point_id){
                    passingPoints = await MaraudePassingService.getPassingPointByMaraudeAndPoint(maraude_id, point_id);
                } else {
                    passingPoints = await MaraudePassingService.getAllPassingPoints();

                }

                res.status(200).json(passingPoints);

            } catch (error) {
                console.error(error);
                res.status(500).json({ "Error": "Error getting passing points" });
            }
        }

        static async addPassingPoint(req, res) {
            try {
                const { id_maraude, id_point, step } = req.body;
                if (!id_maraude || !id_point || !step) {
                    res.status(400).json({ "Error": "Missing parameters" });
                    return;
                }
                const newPassingPoint = await MaraudePassingService.addPassingPoint({ id_maraude, id_point, step });
                res.status(201).json({"Message" : "Passing point added", newPassingPoint});
            } catch (error) {
                console.error(error);
                res.status(500).json({ "Error": "Error adding passing point" });
            }
        }

        static async deletePassingPoint(req, res) {
            try {
                const id = req.params.id;
                await MaraudePassingService.deletePassingPoint(id);
                res.status(204).json({"Message" : "Passing point deleted"});
            } catch (error) {
                console.error(error);
                res.status(500).json({ "Error": "Error deleting passing point" });
            }
        }
}

module.exports = MaraudePassingController;