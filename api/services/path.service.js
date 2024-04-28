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

    static generatePermutations(arr) {
            const permutations = [];

            function permute(arr, start = 0) {
                if (start === arr.length - 1) {
                    permutations.push(arr.slice());
                } else {
                    for (let i = start; i < arr.length; i++) {
                        [arr[start], arr[i]] = [arr[i], arr[start]];
                        permute(arr, start + 1);
                        [arr[start], arr[i]] = [arr[i], arr[start]]; // backtrack
                    }
                }
            }

            permute(arr);
            return permutations;
        }

        static solveTSPWithFixedEndpoints(locations, startPointIndex, endPointIndex) {
            const n = locations.length;
            const indices = Array.from(Array(n).keys()); // [0, 1, 2, ..., n-1]
            const permutations = this.generatePermutations(indices);
            let minDistance = Infinity;
            let optimalPath = [];

            permutations.forEach(perm => {
                if (perm[0] !== startPointIndex || perm[n - 1] !== endPointIndex) {
                    return; // Ignorer les permutations qui ne commencent pas par le point de départ fixe ou ne se terminent pas par le point d'arrivée fixe
                }

                let totalDistance = 0;
                for (let i = 0; i < perm.length - 1; i++) {
                    const fromIndex = perm[i];
                    const toIndex = perm[i + 1];
                    const from = locations[fromIndex];
                    const to = locations[toIndex];
                    totalDistance += this.distance(from.lat, from.lon, to.lat, to.lon);
                }
                // Ajouter la distance du dernier au premier point
                const lastToFirstDistance = this.distance(locations[perm[n - 1]].lat, locations[perm[n - 1]].lon, locations[perm[0]].lat, locations[perm[0]].lon);
                totalDistance += lastToFirstDistance;

                if (totalDistance < minDistance) {
                    minDistance = totalDistance;
                    optimalPath = perm.slice(); // Copie du tableau pour éviter les effets de bord
                }
            });

            return { path: optimalPath, distance: minDistance };
        }
}

module.exports = PathService;