const EventListingRepository = require('../repositories/eventListing.repository');

class EventListingService {
    static async addUserToEvent(id_user, id_event) {
        try {
            return await EventListingRepository.addUserToEvent({ id_user, id_event });
        } catch (error) {
            console.error("Service error:", error);
            throw error;
        }
    }

}

module.exports = EventListingService;