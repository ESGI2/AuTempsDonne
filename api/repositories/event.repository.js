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
    //UPDATE
    static async updateEvent(id, eventData){
        try {
            const event = await Event.findByPk(id);
            if (!event){
                console.error("Event not found");
                return {message: "Event not found"};
            }
            await Event.update(eventData);
            return event.reload();
        }catch (error){
            console.error(error);
            throw error;
        }
    }
    //DELETE
    static async deleteEvent(id){
        try {
            const event = await Event.findByPk(id);
            if (!event){
                console.error("Event not found");
                return{message: "Event not found"};
            }
            return await event.destroy();
        }catch (error){
            console.error("Event error", error);
            throw error;
        }
    }

    //GET AVAILABLE USERS
    static async getAvailableUsers(activity_id){
        try {
            const event = await Event.findByPk(activity_id);
            if(!event){
                return {"Message": "No event found"}
            }

        }catch (error){
            console.error("Available Users error :", error);
            throw error;
        }
    }
}


module.exports = EventRepository;