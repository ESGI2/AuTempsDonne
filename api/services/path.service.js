const MaraudePointService = require("./maraudePoint.service");

class PathService {
    static distance(lat1, lon1, lat2, lon2) {
        const R = 6371;
        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d;
    }

    static deg2rad(deg) {
        return deg * (Math.PI / 180);
    }

    static randomPath(n) {
        // Générer un chemin aléatoire à partir de l'ensemble des indices de n points
        const indices = Array.from(Array(n).keys());
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        return indices;
    }

    static mutatePath(path) {
        // Appliquer une mutation aléatoire sur le chemin en échangeant deux points
        const mutatedPath = [...path];
        const i = Math.floor(Math.random() * mutatedPath.length);
        let j = Math.floor(Math.random() * mutatedPath.length);
        while (j === i) {
            j = Math.floor(Math.random() * mutatedPath.length);
        }
        [mutatedPath[i], mutatedPath[j]] = [mutatedPath[j], mutatedPath[i]];
        return mutatedPath;
    }

    static crossoverPath(parent1, parent2) {
        // Générer un enfant à partir de deux parents en utilisant un crossover partiel
        const child = [];
        const startPos = Math.floor(Math.random() * parent1.length);
        const endPos = Math.floor(Math.random() * parent1.length);
        for (let i = 0; i < parent1.length; i++) {
            if (startPos < endPos && i > startPos && i < endPos) {
                child[i] = parent1[i];
            } else if (startPos > endPos && (i < startPos || i > endPos)) {
                child[i] = parent1[i];
            } else {
                child[i] = null;
            }
        }
        for (let i = 0; i < parent2.length; i++) {
            if (!child.includes(parent2[i])) {
                for (let j = 0; j < child.length; j++) {
                    if (child[j] === null) {
                        child[j] = parent2[i];
                        break;
                    }
                }
            }
        }
        return child;
    }

    static evaluatePath(path, locations) {
        // Évaluer la distance totale d'un chemin donné
        let totalDistance = 0;
        for (let i = 0; i < path.length - 1; i++) {
            const fromIndex = path[i];
            const toIndex = path[i + 1];
            const from = locations[fromIndex];
            const to = locations[toIndex];
            totalDistance += this.distance(from.lat, from.lon, to.lat, to.lon);
        }
        // Ajouter la distance du dernier au premier point
        const firstIndex = path[0];
        const lastIndex = path[path.length - 1];
        const first = locations[firstIndex];
        const last = locations[lastIndex];
        totalDistance += this.distance(last.lat, last.lon, first.lat, first.lon);
        return totalDistance;
    }

    static solveTSPWithGeneticAlgorithm(locations, startPointIndex, endPointIndex, populationSize = 100, generations = 1000) {
        const n = locations.length;
        let population = [];
        for (let i = 0; i < populationSize; i++) {
            population.push(this.randomPath(n));
        }
        let minDistance = Infinity;
        let optimalPath = [];

        for (let gen = 0; gen < generations; gen++) {
            const nextGeneration = [];
            for (let i = 0; i < populationSize; i++) {
                const parent1 = population[Math.floor(Math.random() * populationSize)];
                const parent2 = population[Math.floor(Math.random() * populationSize)];
                const child = this.crossoverPath(parent1, parent2);
                if (Math.random() < 0.1) { // Mutation avec une probabilité de 10%
                    this.mutatePath(child);
                }
                nextGeneration.push(child);
            }
            population = nextGeneration;

            for (let i = 0; i < populationSize; i++) {
                const path = population[i];
                const distance = this.evaluatePath(path, locations);
                if (path[0] === startPointIndex && path[n - 1] === endPointIndex && distance < minDistance) {
                    minDistance = distance;
                    optimalPath = path;
                }
            }
        }

        return { path: optimalPath, distance: minDistance };
    }
}

module.exports = PathService;