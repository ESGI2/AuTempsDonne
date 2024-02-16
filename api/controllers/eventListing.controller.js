const EventListingService = require('../services/eventListing.service'); // Assurez-vous que le service est bien créé et qu'il utilise le repository ci-dessus

class EventListingController {
    // Add User to Event
    static async addUserToEvent(req, res) {
        try {
            const {id_user, id_event} = req.body;
            const result = await EventListingService.addUserToEvent({id_user, id_event});
            res.status(201).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({"Error": "Error adding user to event"});
        }
    }
}

module.exports = EventListingController;