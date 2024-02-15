const EventRepository = require('../repositories/event.repository');

class EventService {
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
}

module.exports = EventService;