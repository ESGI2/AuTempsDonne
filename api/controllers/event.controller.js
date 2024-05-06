const EventService = require('../services/event.service');
const ActivityService = require('../services/activity.service');
const UserServices = require("../services/user.services");
const EventListingServices = require("../services/eventListing.service");
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

    static async getEventByUserId(req, res) {
        try {
            const {id} = req.params;
            const eventListing = await EventListingServices.getListingById(id);
            if (eventListing.length === 0) {
                return res.status(404).json({error: "No events found for this user."});
            }
            const events = [];
            for (let i = 0; i < eventListing.length; i++) {
                const event = await EventService.getEventById(eventListing[i].id_event);
                events.push(event);
            }
            res.status(200).json(events);
        } catch (error) {
            console.error(error);
            res.status(500).json({"Error": "Error recovering event"});
        }
    }

    //ADD
    static async addEvent(req, res) {
        try {
            const {title, description, start, end, activity_id, allDay, maraude, delivery} = req.body;
            const requiredFields = ['title', 'description', 'start', 'end', 'activity_id'];
            let missingFields = [];
            requiredFields.forEach(field => {
                if (!req.body[field]) {
                    missingFields.push(field);
                }
            });
            if (missingFields.length > 0) {
                return res.status(400).json({error: "Missing fields :", missingFields});
            }

            if (title.length > 50 || description.length > 255) {
                return res.status(400).json({error: "Name or description too long."});
            }

            if (moment(start).isAfter(end)) {
                return res.status(400).json({error: "The start date must be before the end date."});
            }
            const activity = await ActivityService.getActivityById(activity_id);
            if (!activity) {
                return res.status(400).json({error: "Activity not found."});
            }

            const eventData = {title, description, start, end, activity_id, allDay, maraude, delivery};

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

    //GET AVAILABLE USERS
    static async getAvailableUsers(req, res) {
        try {
            const {idNewEvent} = req.query;

            // Dans un premier temps on récupère les volontaires
            const volunteers = await UserServices.getVolunteers();
            if (volunteers.length === 0) {
                return res.status(404).json({error: "No volunteers found."});
            }

            // On récupère les dates de début et de fin du nouvel évènement
            const newEvent = await EventService.getEventById(idNewEvent);
            const newEventStart = moment(newEvent.start);
            const newEventEnd = moment(newEvent.end);

            // Pour chaque utilisateur on vérifie si il est disponible
            for (let i = 0; i < volunteers.length; i++) {

                // On vérifie si l'utilisateur participe déja à cet évènement
                const listing = await EventListingServices.getListingByParam(volunteers[i].id, idNewEvent);
                if (listing.length > 0) {
                    volunteers[i].participate = true;
                    volunteers[i].occupied = true;
                } else {
                    volunteers[i].participate = false;
                    const user = volunteers[i];
                    const listing = await EventListingServices.getListingById(user.id);
                    volunteers[i].occupied = false;
                    // Pour chaque évènement de l'utilisateur on récupère les dates de début et de fin
                    for (let j = 0; j < listing.length; j++) {
                        const event = await EventService.getEventById(listing[j].id_event);
                        const eventStart = moment(event.start);
                        const eventEnd = moment(event.end);
                        // On vérifie si les dates se chevauchent
                        if ((moment(newEventStart).isBetween(eventStart, eventEnd) || moment(newEventEnd).isBetween(eventStart, eventEnd)) ||
                            (moment(newEventStart).isSameOrBefore(eventStart) && moment(newEventEnd).isSameOrAfter(eventEnd))) {
                            // On rajoute le paramètre occupied à l'utilisateur
                            volunteers[i].occupied = true;
                        }
                    }
                }

            }

            if (volunteers.length === 0) {
                return res.status(404).json({error: "No volunteers availaible for this event."});
            }

            for (let i = 0; i < volunteers.length; i++) {
                const me = {
                    id: volunteers[i].id,
                    email: volunteers[i].email,
                    role: volunteers[i].role,
                    first_name: volunteers[i].first_name,
                    last_name: volunteers[i].last_name,
                    occupied: volunteers[i].occupied,
                    participate: volunteers[i].participate
                };

                volunteers[i] = me;
            }

            res.status(200).json(volunteers);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: "Error recovering available users"});
        }
    }

}

module.exports = EventController;