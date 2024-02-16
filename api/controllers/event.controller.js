const EventService = require('../services/event.service');
const ActivityService = require('../services/activity.service');
const moment = require('moment-timezone');


class EventController {
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

    static async getEventById(req, res) {
        try {
            const {id} = req.params;
            const event = await EventService.getEventById(id);
            if (!event) {
                return res.status(404).json({"Error": "Event not found"});
            } else {
                return res.status(200).json(event);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({"Error": "Error recovering event"});
        }
    }

    //ADD
    static async addEvent(req, res) {
        try {
            const {name, description, start, end, activity_id} = req.body;
            const requiredFields = ['name', 'description', 'start', 'end', 'activity_id'];
            let missingFields = [];
            const dateFormat = "DD/MM/YYYY HH:mm"; //Verify hh:mm => hours

            requiredFields.forEach(field => {
                if (!req.body[field]) {
                    missingFields.push(field);
                }
            });
            if (missingFields.length > 0) {
                return res.status(400).json({error: "Missing fields :", missingFields});
            }

            if (name.length > 50 || description.length > 255) {
                return res.status(400).json({error: "Name or description too long."});
            }

            if (!moment(start, dateFormat, true).isValid() || !moment(end, dateFormat, true).isValid()) {
                return res.status(400).json({error: "Invalid date format. Use DD/MM/YYYY HH:mm."});
            }

            //Two options :
            //Save in the BDD, format UTC and convert for the front when we show to clients
            //or we format directly in Europe/Paris local hours

            //const formattedStart = moment(start, dateFormat,timeZone).format();
            //const formattedEnd = moment(end, dateFormat,timeZone).format();

            const formattedStartDate = moment.utc(start, dateFormat).local().format('YYYY-MM-DD HH:mm:ss');
            const formattedEndDate = moment.utc(end, dateFormat).local().format('YYYY-MM-DD HH:mm:ss');

            if (moment(formattedStartDate).isAfter(formattedEndDate)) {
                return res.status(400).json({error: "The start date must be before the end date."});
            }
            const activity = await ActivityService.getActivityById(activity_id);
            if (!activity) {
                return res.status(400).json({error: "Activity not found."});
            }

            const eventData = {name, description, start: formattedStartDate, end: formattedEndDate, activity_id};

            const newEvent = await EventService.addEvent(eventData);
            res.status(201).json(newEvent);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: "Error creating event"})
        }
    }

    //UPDATE
    static async updateEvent(req, res) {
        try {
            const {id} = req.params;
            const {name, description, start, end, activity_id} = req.body;
            const eventToUpdate = await EventService.getEventById(id);
            const updatedData = {};
            const dateFormat = "DD/MM/YYYY HH:mm";

            if (!eventToUpdate) {
                return res.status(404).json({error: "Event not found."});
            }

            if (name) updatedData.name = name;
            if (description) updatedData.description = description;
            if (activity_id) updatedData.activity_id = activity_id;

            if (start && moment(start, dateFormat, true).isValid()) {
                updatedData.start = moment.utc(start, dateFormat).local().format('YYYY-MM-DD HH:mm:ss');
            }
            if (end && moment(end, dateFormat, true).isValid()) {
                updatedData.end = moment.utc(end, dateFormat).local().format('YYYY-MM-DD HH:mm:ss');
            }

            if (start && end && moment(updatedData.start).isAfter(updatedData.end)) {
                return res.status(400).json({error: "The start date must be before the end date."});
            }

            await eventToUpdate.update(updatedData);
            res.status(200).json({message: "Event updated successfully", event: eventToUpdate});
        } catch (error) {
            console.error(error);
            res.status(500).json({error: "Error updating event"});
        }
    }

    //DELETE
    static async deleteEvent(req, res) {
        try {
            const {id} = req.params;
            const deleteEvent = await EventService.deleteEvent(id);
            if (!deleteEvent) {
                res.status(404).json({error: "Event not found"});
            } else {
                res.status(200).json({message: "Event deleted success", deleteEvent});
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({error: "Error deleting event"})
        }
    }


}

module.exports = EventController;