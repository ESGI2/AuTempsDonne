const MaraudePointService = require("../services/maraudePoint.service");
const PathService = require("../services/path.service");

class PathController {
    static async bestpath(req, res){
        const data = req.query

        const start = await MaraudePointService.getMaraudePointById(data.start);
        if (!start) return res.status(404).json({message: "Point de départ introuvable"});

        const end = await MaraudePointService.getMaraudePointById(data.end);
        if (!end) return res.status(404).json({message: "Point d'arrivée introuvable"});

        const points = [];
        points.push(start);

        data.inter = data.inter.split(',').map(Number);

        for (let i = 0; i < data.inter.length; i++){
            const point = await MaraudePointService.getMaraudePointById(data.inter[i]);
            if (!point) return res.status(404).json({message: "Point intermédiaire introuvable"});
            points.push(point);
        }

        points.push(end);

        const startPointIndex = 0;
        const endPointIndex = points.length - 1;

        const resultWithFixedEndpoints = PathService.solveTSPWithGeneticAlgorithm(points, startPointIndex, endPointIndex);
        // Trie les points dans l'ordre de la solution optimale
        const sortedPoints = resultWithFixedEndpoints.path.map(index => points[index]);
        console.log("Chemin optimal avec points de départ et d'arrivée fixés:", sortedPoints.map(p => p.name).join(" -> "));
        console.log("Distance totale avec points de départ et d'arrivée fixés:", resultWithFixedEndpoints.distance.toFixed(2), "kilomètres");

        res.status(200).json(sortedPoints);

    }
}

module.exports = PathController;