const DeliveryService = require('../services/delivery.service');
const Delivery = require('../models/delivery.model');
const EventService = require("../services/event.service");
const PathService = require("../services/path.service");
const {spawn} = require("child_process");
const fs = require("fs");
const DeliveryPointService = require("../services/deliveryPoint.service");
const DeliveryListingService = require("../services/deliveryListing.service");

class DeliveryController {
    static async createDelivery(req, res) {
        try {

            const { title, description , date_start , date_end , road_start , road_end , road_inter , truck } = req.body;

            if (!title || !description || !date_start || !date_end || !road_start || !road_end || !road_inter || !truck   ) {
                return res.status(400).json({ error: 'Provide all parameters' });
            }

            const event = await EventService.addEvent({ title, description, start: date_start, end: date_end, allDay: 0, activity_id: 1 , maraude: false, delivery: true});
            const delivery = await DeliveryService.addDelivery({ id_event: event.id, id_truck: truck , status:0});


            /*
            Récupérer le chemin optimisé en utilisant start, end et inter et le service du path
             */


            const start = await DeliveryPointService.getDeliveryPointById(road_start);
            if (!start) return res.status(404).json({message: "Point de départ introuvable"});
            const end = await DeliveryPointService.getDeliveryPointById(road_end);
            if (!end) return res.status(404).json({message: "Point d'arrivée introuvable"});


            const points = [];
            points.push(start);

            const inter = road_inter.split(',').map(Number);

            for (let i = 0; i < inter.length; i++){
                const point = await DeliveryPointService.getDeliveryPointById(inter[i]);
                if (!point) return res.status(404).json({message: "Point intermédiaire introuvable", i});
                points.push(point);
            }
            points.push(end);

            const resultWithFixedEndpoints = PathService.solveTSPWithGeneticAlgorithm(points, 0, points.length - 1);

            const sortedPoints = resultWithFixedEndpoints.path.map(index => points[index]);
            console.log("Chemin optimal avec points de départ et d'arrivée fixés:", sortedPoints.map(p => p.name).join(" -> "));

            // Convertir sortedPoints en un tableau de points (nom, lat, lon)
            const pointsData = sortedPoints.map(p => ({ name: p.name, lat: p.lat, lon: p.lon }));

            // On crée les Delivery passing pour chaque point avec le path en tant que step (id_delivery, id_point, step)
            for (let i = 0; i < sortedPoints.length; i++){
                await DeliveryListingService.addPassingPoint({ id_delivery: delivery.id, id_point: sortedPoints[i].id, step: i });
            }

            // Exécution du script Python pour tracer les points sur la carte
            console.log('Running script to generate map...')

            const pointsDataNumeric = pointsData.map(point => ({
                name: point.name,
                lat: parseFloat(point.lat),
                lon: parseFloat(point.lon)
            }));

            const pythonProcess = spawn('python', ['./components/delivery_script.py', JSON.stringify(pointsDataNumeric), 'delivery_map_' + delivery.id]);
            pythonProcess.stderr.on('data', (data) => {
                console.error(`stderr: ${data}`);
            });

            console.log('Map generated successfully!')

            console.log('Sending response...')
            // Supprimer le fichier de la carte après 10 secondes
            setTimeout(() => {
                // Chemin du fichier à supprimer
                const filePath = './delivery_map_' + delivery.id + '.html';

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

            res.status(201).json({ message: "Delivery created successfully", maraude, event, products, sortedPoints});


        } catch (error) {
            return res.status(500).json({ error: 'Error during delivery post', details: error });
        }
    }

    static async UpdateStatus(req, res) {
        const { id_delivery } = req.params;

        if (!id_delivery) {
            return res.status(400).json({ error: 'Provide delivery ID' });
        }

        try {
            const updateStatusDelivery = await DeliveryService.updateStatus(id_delivery);
            return res.status(201).json(updateStatusDelivery);
        } catch (error) {
            return res.status(500).json({ error: 'force' });
        }
    }


    static async UpdateStatusFinish(req, res) {
        const { id_delivery } = req.params;

        if (!id_delivery) {
            return res.status(400).json({ error: 'Provide delivery ID' });
        }

        try {
            const updateStatusDelivery = await DeliveryService.UpdateStatusFinish(id_delivery);
            return res.status(201).json(updateStatusDelivery);
        } catch (error) {
            return res.status(500).json({ error: 'Error during delivery post' });
        }
    }


    static async getAllDeliveries(req, res) {
        try {
            const deliveries = await DeliveryService.getAllDeliveries();
            return res.json(deliveries);
        } catch (error) {
            return res.status(500).json({ error: 'Error during delivery get' });
        }
    }
}

module.exports = DeliveryController;
