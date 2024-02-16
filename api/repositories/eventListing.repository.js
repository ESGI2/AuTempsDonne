const EventListing = require('../models/eventListing.model'); // Assurez-vous que le chemin est correct

class EventListingRepository {
    // Add User to Event
    static async addUserToEvent({id_user, id_event}) {
        try {
            return await EventListing.create({id_user, id_event});
        } catch (error) {
            console.error("EventListing error:", error);
            throw error;
        }
    }

}

module.exports = EventListingRepository;
