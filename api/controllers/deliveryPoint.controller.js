const DeliveryPointService = require('../services/deliveryPoint.service');
const DeliveryPoint = require('../models/deliveryPoint.model');

class DeliveryPointController {
    static async createDeliveryPoint(req, res) {
        try {
            const { type, name, country, city, postal_code, road } = req.body;
            const newDeliveryPoint = await DeliveryPointService.createDeliveryPoint({ type, name, country, city, postal_code, road });
            return res.status(201).json(newDeliveryPoint);
        } catch (error) {
            return res.status(500).json({ error: 'Error during point creation' });
        }
    }

    static async getAllDeliveryPoints(req, res) {
        try {
            const deliveryPoints = await DeliveryPointService.getAllDeliveryPoints();
            return res.status(200).json(deliveryPoints);
        } catch (error) {
            return res.status(500).json({ error: 'Error during fetching delivery points' });
        }
    }

    static async deleteDeliveryPoint(req, res) {
        const pointId = req.params.id;
        try {
            await DeliveryPointService.deleteDeliveryPoint(pointId);
            return res.status(200).json({ message: 'Delivery point deleted successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Error during deletion of delivery point' });
        }
    }

    static async addDeliveryPointCord(req, res) {
        try {
            const api_key = process.env.GEOCODE_API_KEY;

            const pre_data = {
                name: req.body.name,
                country: req.body.country,
                city: req.body.city,
                code_postal: req.body.postal_code,
                street: req.body.road
            }

            const response = await fetch(`https://geocode.maps.co/search?q=${pre_data.street}+${pre_data.city}+${pre_data.country}&api_key=${api_key}`);
            const map_response = await response.json();

            const newDeliveryPoint = new DeliveryPoint({
                type: req.body.type,
                name: req.body.name,
                country: req.body.country,
                city: req.body.city,
                postal_code: req.body.postal_code,
                road: req.body.road,
                lat: map_response[0].lat,
                lon: map_response[0].lon
            });

            const result = await newDeliveryPoint.save();
            res.status(201).json(result);
        } catch (error) {
            console.error('Error adding delivery point:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = DeliveryPointController;
