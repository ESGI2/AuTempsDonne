const EventListingRepository = require('../repositories/eventListing.repository');

class EventListingService {
    static async addUserToEvent(id_user, id_event) {
        try {
            return await EventListingRepository.addUserToEvent(id_user, id_event);
        } catch (error) {
            console.error("Service error:", error);
            throw error;
        }
    }

    static async getListingById(id_user) {
        try {
            return await EventListingRepository.getListingById(id_user);
        } catch (error) {
            console.error("Service error:", error);
            throw error;
        }
    }

    static async getListingByEvent(id_event) {
        try {
            return await EventListingRepository.getListingByEvent(id_event);
        } catch (error) {
            console.error("Service error:", error);
            throw error;
        }
    }

    static async getListingByParam(id_user, id_event) {
        try {
            return await EventListingRepository.getListingByParam(id_user, id_event);
        } catch (error) {
            console.error("Service error:", error);
            throw error;
        }
    }

    static async getAllListings() {
        try {
            return await EventListingRepository.getAllListings();
        } catch (error) {
            console.error("Service error:", error);
            throw error;
        }
    }

    static async deleteUserListing(id_user, id_event) {
        try {
            return await EventListingRepository.deleteUserListing(id_user, id_event);
        } catch (error) {
            console.error("Service error:", error);
            throw error;
        }
    }

}

module.exports = EventListingService;