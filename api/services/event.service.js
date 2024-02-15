const EventRepository = require('../repositories/event.repository');

class EventService {
    //GET ALL & By ID
    static async getAllEvents(){
        try {
            const event = await EventRepository.getAllEvents();
            return event;
        }catch (error){
            console.error(error);
            throw error;
        }
    }
    static async getEventById(id){
        try{
            const event = await EventRepository.getEventById(id);
            return event;
        }catch (error){
            console.error(error);
            throw error;
        }

    }

    //ADD
    static async addEvent(eventData){
        return EventRepository.addEvent(eventData);
    }

    //UPDATE
    static async updateEvent(id, eventData) {
        return await EventRepository.updateEvent(id, eventData);
    }

}

module.exports = EventService;