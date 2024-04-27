const TicketService = require('../services/ticket.service');

class TicketController {

    static async getAllTickets(req, res)
    {
        try {
            const allTickets = await TicketService.getAllTickets();
            res.status(200).json(allTickets);
        } catch (error) {
            console.error(error);
            res.status(500).json({"Error": 'Error during ticket get'});
        }
    }

    static async getTicketById(req, res)
    {
        try {
            const {id} = req.params;
            const ticket = await TicketService.getTicketById(id);
            if (ticket == null) {
                return res.status(404).json({"Error": "No ticket found with the given id"});
            }
            res.status(200).json(ticket);
        } catch (error) {
            console.error(error);
            res.status(500).json({"Error": 'Error during ticket get'});
        }
    }

    static async getSelfTickets(req, res)
    {
        try {
            const {id} = req.user;
            const tickets = await TicketService.getSelfTickets(id);
            res.status(200).json(tickets);
        } catch (error) {
            console.error(error);
            res.status(500).json({"Error": 'Error during ticket get'});
        }
    }

    static async addTicket(req, res)
    {
        try {
            const data = req.body;
            data.user_id = req.user.id;
            const newTicket = await TicketService.addTicket(data);
            res.status(201).json(newTicket);
        } catch (error) {
            console.error(error);
            res.status(500).json({"Error": 'Error during ticket post'});
        }
    }

    static async updateTicket(req, res)
    {
        try {
            const {id} = req.params;
            const data = req.body;
            data.user_id = req.user.id;
            data.role = req.user.role;
            const updatedTicket = await TicketService.updateTicket(id, data);
            if (updatedTicket === 1) {
                return res.status(403).json({"Error": "No ticket found with the given id"});
            } else if (updatedTicket === 2) {
                return res.status(404).json({"Error": "You are not allowed to update this ticket"});
            }
            res.status(200).json(updatedTicket);
        } catch (error) {
            console.error(error);
            res.status(500).json({"Error": 'Error during ticket update'});
        }
    }


    static async deleteTicket(req, res){
        try {
            const {id} = req.params;
            const data = req.user;
            const deletedTicket = await TicketService.deleteTicket(id, data);
            if (deletedTicket === 1) {
                return res.status(403).json({"Error": "No ticket found with the given id"});
            } else if (deletedTicket === 2) {
                return res.status(404).json({"Error": "You are not allowed to delete this ticket"});
            }
            res.status(200).json({"Message" : "Ticket successfully deleted"});
        } catch (error) {
            console.error(error);
            res.status(500).json({"Error": 'Error during ticket delete'});
        }
    }

    static async incrementTicketStatus(req, res) {
        try {
            const { id } = req.params;
            console.log(id)
            const updatedTicket = await TicketService.incrementTicketStatus(id);
            res.status(200).json(updatedTicket);
        } catch (error) {
            console.error(error);
            res.status(500).json({"Error": 'Error during ticket status increment'});
        }
    }

    static async addAnswerToTicket(req, res) {
        try {
            const { ticketId, userId } = req.body;
            console.log({ ticketId, userId })
            const updatedTicket = await TicketService.addAnswerToTicket(ticketId, userId);
            res.status(200).json(updatedTicket);
        } catch (error) {
            console.error(error);
            res.status(500).json({"Error": 'Error during adding answer to ticket'});
        }
    }
}

module.exports = TicketController;