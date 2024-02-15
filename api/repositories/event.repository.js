const Event = require('../models/event.model');

class EventRepository {
    // GET ALL & By ID
    static async getAllEvents(){
        try {
            const event = await Event.findAll();
            if(event.length === 0){
                return {"Message": "No event found"}
            }
            return event;
        }catch (error){
            console.error("Event error :", error);
            throw error;
        }
    }
    static async getEventById(id){
        try {
            const event = await Event.findByPk(id);
            if(!event){
                return {"Message":"No event found"}
            }
            return event;
        }catch (error){
            console.error("Event error :", error);
            throw error;
        }
    }
    //ADD
    static async addEvent(eventData){
        try{
            return await Event.create(eventData)
        }catch (error){
            console.error("Event error :", error);
            throw error;
        }
    }
}


module.exports = EventRepository;