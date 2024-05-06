const MaraudeService = require('../services/maraude.service');
const TruckService =  require ('../services/truck.services');
const EventService = require('../services/event.service');
const PathService = require('../services/path.service');
const MaraudePassingService = require('../services/maraudePassing.service');
const ProductService = require('../services/product.services');
const moment = require('moment');
const { spawn } = require('child_process');
const fs = require('fs');
const MaraudePointService = require("../services/maraudePoint.service");
const MaraudeContentService = require("../services/maraudeContent.service");


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

            if (!maraude){
                return res.status(404).json({"Error":"Maraude not found"});
            }

            let data = maraude;
            data.event = await EventService.getEventById(maraude.id_event);
            data.truck = await TruckService.getTruckById(maraude.id_truck);

            return res.status(200).json({
                "maraude": data,
                "event": data.event,
                "truck": data.truck
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({"Error": "Error recovering maraude"})
        }
    }


    //ADD
    static async addMaraude(req, res) {
        try {
            const { title, description, date_start, date_end, road_start, road_end, road_inter, truck, product} = req.body;
            const requiredFields = ['title', 'description', 'date_start', 'date_end', 'road_start', 'road_end', 'road_inter', 'truck', 'product'];
            let missingFields = [];

            requiredFields.forEach(field => {
                if (!req.body[field]) {
                    missingFields.push(field);
                }
            });

            if (missingFields.length > 0) {
                return res.status(400).json({ error: "Missing fields", missingFields });
            }

            /*
            Création d'un event (title, description, date_start, date_end)
            Création de la maraude associé (id_event, id_truck)
            Edition de l'event -> ajout de l'id maraude dans l'event (id_maraude dans l'event)
             */

            const event = await EventService.addEvent({ title, description, start: date_start, end: date_end, allDay: 0, activity_id: 1 , maraude: true, delivery: false});
            const maraude = await MaraudeService.addMaraude({ id_event: event.id, id_truck: truck });

            /*
            Récupérer le chemin optimisé en utilisant start, end et inter et le service du path
             */

            const start = await MaraudePointService.getMaraudePointById(road_start);
            if (!start) return res.status(404).json({message: "Point de départ introuvable"});
            const end = await MaraudePointService.getMaraudePointById(road_end);
            if (!end) return res.status(404).json({message: "Point d'arrivée introuvable"});

            const points = [];
            points.push(start);

            const inter = road_inter.split(',').map(Number);

            for (let i = 0; i < inter.length; i++){
                const point = await MaraudePointService.getMaraudePointById(inter[i]);
                if (!point) return res.status(404).json({message: "Point intermédiaire introuvable", i});
                points.push(point);
            }
            points.push(end);

            const resultWithFixedEndpoints = PathService.solveTSPWithGeneticAlgorithm(points, 0, points.length - 1);

            const sortedPoints = resultWithFixedEndpoints.path.map(index => points[index]);
            console.log("Chemin optimal avec points de départ et d'arrivée fixés:", sortedPoints.map(p => p.name).join(" -> "));

            // Convertir sortedPoints en un tableau de points (nom, lat, lon)
            const pointsData = sortedPoints.map(p => ({ name: p.name, lat: p.lat, lon: p.lon }));

            // On crée les maraudes passing pour chaque point avec le path en tant que step (id_maraude, id_point, step)
            for (let i = 0; i < sortedPoints.length; i++){
                await MaraudePassingService.addPassingPoint({ id_maraude: maraude.id, id_point: sortedPoints[i].id, step: i });
            }

            // Exécution du script Python pour tracer les points sur la carte
            console.log('Running script to generate map...')

            const pointsDataNumeric = pointsData.map(point => ({
                name: point.name,
                lat: parseFloat(point.lat),
                lon: parseFloat(point.lon)
            }));

            const pythonProcess = spawn('python', ['./components/map_script.py', JSON.stringify(pointsDataNumeric), 'maraude_map_' + maraude.id]);
            pythonProcess.stderr.on('data', (data) => {
                console.error(`stderr: ${data}`);
            });

            console.log('Map generated successfully!')

            console.log('Sending response...')
            // Supprimer le fichier de la carte après 10 secondes
            setTimeout(() => {
                // Chemin du fichier à supprimer
                const filePath = './maraude_map_' + maraude.id + '.html';

                // Supprimer le fichier
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    console.log('Le fichier a été supprimé avec succès!');
                });
            }, 5000);

            console.log('Response sent!')

            // TODO : Crée les maraudes content pour chaque produit de la maraude (id_maraude, id_product, quantity)

            const products = product.split(',').map(p => {
                const [id_product, quantity] = p.split(':');
                return { id_product, quantity };
            });

            for (let i = 0; i < products.length; i++) {
                try {
                    if (!products[i].id_product || !products[i].quantity) {
                        console.log('Missing parameters');
                        return;
                    }
                    await MaraudeContentService.create({ id_maraude: maraude.id, id_product: products[i].id_product, quantity: products[i].quantity });
                } catch (error) {
                    console.log(error)
                    res.status(500).json({ "Error": "Error creating maraude content" });
                }
            }

            console.log('Creating maraude content...')

            res.status(201).json({ message: "Maraude created successfully", maraude, event, products, sortedPoints});

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
            }

            const deleteEvent = await EventService.deleteEvent(deleteMaraude.id_event);
            if (!deleteEvent){
                res.status(404).json({"Error":"Event not found"});
            }

            res.status(200).json({"Message":"Maraude deleted successfully"});
        }catch (error){
            console.error(error);
            res.status(500).json({"Error":"Error deleting maraude"})
        }
    }
}
module.exports = MaraudeController;

