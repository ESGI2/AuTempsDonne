const EventListingService = require('../services/eventListing.service'); // Assurez-vous que le service est bien créé et qu'il utilise le repository ci-dessus

class EventListingController {
    // Add User to Event
    static async addUserToEvent(req, res) {
        try {
            const {id_user, id_event} = req.body;
            const result = await EventListingService.addUserToEvent(id_user, id_event);
            res.status(201).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({"Error": "Error adding user to event"});
        }
    }

    static async getListingByParam(req, res) {
        try {
            const {id_user, id_event} = req.query;
            if (id_user && id_event) {
                const result = await EventListingService.getListingByParam(id_user, id_event);
                return res.status(200).json(result);
            } else if (id_user) {
                const result = await EventListingService.getListingById(id_user);
                return res.status(200).json(result);
            } else if (id_event) {
                const result = await EventListingService.getListingByEvent(id_event);
                return res.status(200).json(result);
            } else {
                const result = await EventListingService.getAllListings();
                return res.status(200).json(result);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({"Error": "Error getting event listing"});
        }
    }

    static async deleteUserListing(req, res) {
        try {
            const {id_user, id_event} = req.body;
            const result = await EventListingService.deleteUserListing(id_user, id_event);
            res.status(200).json({Message: "User deleted from event"});
        } catch (error) {
            console.error(error);
            res.status(500).json({"Error": "Error deleting user from event"});
        }
    }
}

module.exports = EventListingController;