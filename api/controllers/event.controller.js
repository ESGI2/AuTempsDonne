const EventService = require ('../services/event.service');

class EventController{
    //GET ALL & By ID
    static async getAllEvents(req, res) {
        try {
            const event = await EventService.getAllEvents();
            res.status(200).json(event);
        } catch (error) {
            console.error(error);
            res.status(500).json({"Error": "Error recovering event"});
        }
    }
    static async getEventById(req, res){
        try {
            const {id} = req.params;
            const event = await EventService.getEventById(id);
            if(!event){
                return res.status(404).json({"Error":"Event not found"});
            }else{
                return res.status(200).json(event);
            }
        }catch (error){
            console.error(error);
            res.status(500).json({"Error": "Error recovering event"});
        }
    }
}

module.exports = EventController;