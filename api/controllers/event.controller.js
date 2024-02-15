const EventService = require ('../services/event.service');
//const ActivityService = require('../services/activity.service');
const moment = require('moment'); //Need 'npm install moment'

class EventController{
    //GET ALL & By ID
    static async getAllEvents(req, res) {
        try {
            const event = await EventService.getAllEvents();
            res.status(200).json(event);
        } catch (error) {
            console.error(error);
            res.status(500).json({"Error": "Error recovering event"});
        }
    }
    static async getEventById(req, res){
        try {
            const {id} = req.params;
            const event = await EventService.getEventById(id);
            if(!event){
                return res.status(404).json({"Error":"Event not found"});
            }else{
                return res.status(200).json(event);
            }
        }catch (error){
            console.error(error);
            res.status(500).json({"Error": "Error recovering event"});
        }
    }
    //ADD
    static async addEvent(req, res){
        try {
            const { name, description, start, end, activity_id, activity_type } = req.body;
            const requiredFields = ['name', 'description', 'start', 'end', 'activity_id', 'activity_type'];
            let missingFields = [];
            const dateFormat = "DD/MM/YYYY HH:MI"; //Verify hh:mm => hours

            requiredFields.forEach(field =>{
                if (!req.body[field]){
                    missingFields.push(field);
                }
            });
            if (missingFields.length > 0){
                return res.status(400).json({error: "Missing fields :", missingFields});
            }

            if (name.length > 50 || description.length > 255) {
                return res.status(400).json({ error: "Name or description too long." });
            }

            if (!moment(start, dateFormat, true).isValid() || !moment(end, dateFormat, true).isValid()) {
                return res.status(400).json({error: "Invalid date format. Use DD/MM/YYYY HH:MI."});
            }
            //Pour le save dans la bdd Y/M/D
            const formattedStart = moment(start, dateFormat).format('YYYY-MM-DD HH:MI');
            const formattedEnd = moment(end, dateFormat).format('YYYY-MM-DD HH:MI.');
            if (moment(formattedStart).isAfter(formattedEnd)) {
                return res.status(400).json({error: "The start date must be before the end date."});
            }
            //Refaire activityService
           // const activity = await ActivityService.findById(activity_id);
            // if (!activity) {
            //    return res.status(400).json({ error: "Activity not found." });
            //}
            //Type activity need more precision,what's exactly the mean of it. ==> SUREMENT DEGAGE
            const eventData = { name, description, start: formattedStart, end: formattedEnd, activity_id, activity_type };
            const newEvent = await EventService.addEvent(eventData);
            res.status(201).json(newEvent);
        }catch (error){
            console.error(error);
            res.status(500).json({error: "Error creating event"})
        }
    }
    //UPDATE
    static async updateEvent(req, res) {
        try {
            const { id } = req.params;
            const { name, description, start, end, activity_id, activity_type } = req.body;
            const dateFormat = "DDMMYYYY";
            let eventToUpdate = await EventService.getEventById(id);


            if (!eventToUpdate) {
                return res.status(404).json({ error: "Event not found." });
            }

            eventToUpdate.name = name ?? eventToUpdate.name;
            eventToUpdate.description = description ?? eventToUpdate.description;
            eventToUpdate.activity_id = activity_id ?? eventToUpdate.activity_id; //Name or Id, what's better ?
            eventToUpdate.activity_type = activity_type ?? eventToUpdate.activity_type;

            if (start && moment(start, dateFormat, true).isValid()) {
                eventToUpdate.start = moment(start, dateFormat).format('YYYY-MM-DD');
            }
            if (end && moment(end, dateFormat, true).isValid()) {
                eventToUpdate.end = moment(end, dateFormat).format('YYYY-MM-DD');
            }

            if (eventToUpdate.start && eventToUpdate.end && moment(eventToUpdate.start).isAfter(eventToUpdate.end)) {
                return res.status(400).json({ error: "The start date must be before the end date." });
            }


            const updatedEvent = await EventService.updateEvent(id, eventToUpdate);
            res.status(200).json(updatedEvent);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error updating event" });
        }
    }



}

module.exports = EventController;