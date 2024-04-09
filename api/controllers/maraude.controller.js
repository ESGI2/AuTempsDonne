const MaraudeService = require('../services/maraude.service');
const TruckService =  require ('../services/truck.services');
const moment = require('moment');


class MaraudeController{

    //GET ALL & By ID
    static async getAllMaraudes(req, res){
        try {
            const maraude = await MaraudeService.getAllMaraudes();
            res.status(200).json(maraude);
        }catch (error){
            console.error(error);
            res.status(500).json({"Error": "Error recovering maraude"})
        }
    }
    static async getMaraudeById(req, res){
        try {

            const {id} = req.params;
            const maraude = await MaraudeService.getMaraudeById(id);
            if(!maraude){
                return res.status(404).json({"Error": "Maraude not found"})
            }else{
                return res.status(200).json(maraude);
            }
        }catch (error){
            console.error(error);
            res.status(500).json({"Error": "Error recovering maraude"})
        }
    }

    //ADD
    static async addMaraude(req, res) {
        try {
            const { date, duration, id_truck, people_needed } = req.body;
            const requiredFields = ['date', 'duration', 'id_truck', 'people_needed'];
            let missingFields = [];
            const dateFormat = "DD/MM/YYYY";
            const durationFormat = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
            const currentDate = moment().startOf('day');

            requiredFields.forEach(field => {
                if (!req.body[field]) {
                    missingFields.push(field);
                }
            });
            if (missingFields.length > 0) {
                return res.status(400).json({ error: "Missing fields", missingFields });
            }

            if (!moment(date, dateFormat, true).isValid()) {
                return res.status(400).json({ error: "Invalid date format. Use DD/MM/YYYY" });
            }

            const inputDate = moment(date, dateFormat);
            if (inputDate.isBefore(currentDate)) {
                return res.status(400).json({ error: "Date cannot be in the past" });
            }

            if (!durationFormat.test(duration)) {
                return res.status(400).json({ error: "Invalid duration format. Use HH:mm" });
            }

            if (people_needed <= 0) {
                return res.status(400).json({ error: "Invalid number of people needed. Must be greater than 0" });
            }

            const formattedDate = moment.utc(date, dateFormat).format('YYYY-MM-DD');

            const maraudeData = { date: formattedDate, duration, id_truck, people_needed };
            const newMaraude = await MaraudeService.addMaraude(maraudeData);
            res.status(201).json(newMaraude);
        } catch (error) {
            console.error(error);
            res.status(500).json({ "Error": "Error creating maraude" });
        }
    }

    //UPDATE
    static async updateMaraude(req, res) {
        try {
            const {id} = req.params;
            const {date, duration, id_truck, people_needed} = req.body;
            const maraudeToUpdate = await MaraudeService.getMaraudeById(id);
            const updatedData = {};
            const dateFormat = "DD/MM/YYYY";
            const durationFormat = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

            if (!maraudeToUpdate) {
                return res.status(404).json({error: "Maraude not found."});
            }

            if (date && moment(date, dateFormat, true).isValid()) {
                const inputDate = moment(date, dateFormat);
                const currentDate = moment().startOf('day');
                if (inputDate.isBefore(currentDate)) {
                    return res.status(400).json({error: "Date cannot be in the past"});
                }
                updatedData.date = moment.utc(date, dateFormat).local().format('YYYY-MM-DD');
            }

            if (duration && durationFormat.test(duration)) {
                updatedData.duration = duration;
            } else if (duration) {
                return res.status(400).json({error: "Invalid duration format. Use HH:mm"});
            }

            if (id_truck) updatedData.id_truck = id_truck;
            if (people_needed) {
                if (people_needed <= 0) {
                    return res.status(400).json({error: "Invalid number of people needed. Must be greater than 0"});
                }
                updatedData.people_needed = people_needed;
            }

            await MaraudeService.updateMaraude(id, updatedData);
            res.status(200).json({message: "Maraude updated successfully", maraude: updatedData});
        } catch (error) {
            console.error(error);
            res.status(500).json({error: "Error updating maraude"});
        }
    }


    //DELETE
    static async deleteMaraude(req, res){
        const { id } = req.params;
        try {
            const deleteMaraude = await MaraudeService.deleteMaraude(id);
            if (!deleteMaraude){
                res.status(404).json({"Error":"Maraude not found"});
            }else{
                res.status(200).json(deleteMaraude);
            }
        }catch (error){
            console.error(error);
            res.status(500).json({"Error":"Error deleting maraude"})
        }
    }

    static async bestpath(req, res){
        // Fonction pour calculer la distance entre deux points géographiques
        function distance(lat1, lon1, lat2, lon2) {
            const R = 6371; // Rayon de la Terre en kilomètres
            const dLat = deg2rad(lat2 - lat1);
            const dLon = deg2rad(lon2 - lon1);
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const d = R * c; // Distance en kilomètres
            return d;
        }

// Convertir degrés en radians
        function deg2rad(deg) {
            return deg * (Math.PI / 180);
        }

// Fonction pour générer toutes les permutations possibles
        function generatePermutations(arr) {
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

// Fonction principale pour résoudre le problème du voyageur de commerce
        function solveTSPWithFixedEndpoints(locations, startPointIndex, endPointIndex) {
            const n = locations.length;
            const indices = Array.from(Array(n).keys()); // [0, 1, 2, ..., n-1]
            const permutations = generatePermutations(indices);
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
                    totalDistance += distance(from.lat, from.lon, to.lat, to.lon);
                }
                // Ajouter la distance du dernier au premier point
                const lastToFirstDistance = distance(locations[perm[n - 1]].lat, locations[perm[n - 1]].lon, locations[perm[0]].lat, locations[perm[0]].lon);
                totalDistance += lastToFirstDistance;

                if (totalDistance < minDistance) {
                    minDistance = totalDistance;
                    optimalPath = perm.slice(); // Copie du tableau pour éviter les effets de bord
                }
            });

            return { path: optimalPath, distance: minDistance };
        }

// Exemple d'utilisation
        const locations = [
            { name: "A", lat: 49.047598, lon: 3.391474 }, // Chateau-Thierry
            { name: "B", lat: 48.845825, lon: 2.385113 }, // Erard
            { name: "C", lat: 48.979516, lon: 3.286314 }, // Saulchery
            { name: "D", lat: 43.614017, lon: 1.425850 }, // Toulouse
            { name: "E", lat: 45.755700, lon: 4.833016 }, // Lyon
            { name: "F", lat: 47.327422, lon: 5.038355 }, // Dijon

            // Ajouter plus de villes si nécessaire
        ];

        const result = solveTSP(locations);
        console.log("Chemin optimal:", result.path.map(index => locations[index].name).join(" -> "));
        console.log("Distance totale:", result.distance.toFixed(2), "kilomètres");
        res.status(200).json(result);
    }
}
module.exports = MaraudeController;

