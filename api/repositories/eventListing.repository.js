const EventListing = require('../models/eventListing.model'); // Assurez-vous que le chemin est correct

class EventListingRepository {
    // Add User to Event
    static async addUserToEvent(id_user, id_event) {
        try {
            return await EventListing.create({id_user, id_event});
        } catch (error) {
            console.error("EventListing error:", error);
            throw error;
        }
    }

    static async getListingById(id_user) {
        try {
            return await EventListing.findAll({where: {id_user}});
        } catch (error) {
            console.error("EventListing error:", error);
            throw error;
        }
    }

    static async getListingByEvent(id_event) {
        try {
            return await EventListing.findAll({where: {id_event}});
        } catch (error) {
            console.error("EventListing error:", error);
            throw error;
        }
    }

    static async isUserInEvent(id_user, id_event) {
        try {
            const result = await EventListing.findOne({ where: { id_user, id_event } });
            return !!result;
        } catch (error) {
            console.error("EventListing error:", error);
            throw error;
        }
    }


    static async getListingByParam(id_user, id_event) {
        try {
            return await EventListing.findAll({where: {id_user, id_event}});
        } catch (error) {
            console.error("EventListing error:", error);
            throw error;
        }
    }

    static async getAllListings() {
        try {
            return await EventListing.findAll();
        } catch (error) {
            console.error("EventListing error:", error);
            throw error;
        }
    }

    static async deleteUserListing(id_user, id_event) {
        try {
            return await EventListing.destroy({where: {id_user, id_event}});
        } catch (error) {
            console.error("EventListing error:", error);
            throw error;
        }
    }
}

module.exports = EventListingRepository;
