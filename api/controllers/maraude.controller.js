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
    static async updateMaraude(req, res){
        const { id } = req.params;
        const maraudeData = req.body;
        try{
            const updateMaraude = await MaraudeService.updateMaraude(id, maraudeData);
            if (!updateMaraude){
                res.status(404).json({"Error":"Maraude not found"});
            }else {
                res.status(200).json(updateMaraude);
            }
        }catch (error){
            console.error(error);
            res.status(500).json({"Error":"Error updating maraude"});
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
}
module.exports = MaraudeController;

