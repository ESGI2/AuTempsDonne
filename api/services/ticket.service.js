const TicketRepository = require('../repositories/ticket.repository');

class TicketService {
    static async getAllTickets(){
        try {
            return await TicketRepository.getAllTickets();
        } catch (error){
            console.error(error);
            throw error;
        }
    }
    static async getTicketById(id){
        try{
            return await TicketRepository.getTicketById(id);
        }catch (error){
            console.error(error);
            throw error;
        }

    }

    static async getSelfTickets(id){
        try {
            return await TicketRepository.getSelfTickets(id);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async addTicket(user_data) {
        try {
            return await TicketRepository.addTicket(user_data);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async updateTicket(id, data) {
        // Check if the user is the owner of the ticket or an admin
        try {
            const ticket = await TicketRepository.getTicketById(id);
            if (ticket == null) {
                return 1;
            }
            if (ticket.id_user !== data.user_id && data.role !== 'admin') {
                return 2;
            }
        } catch (error){
            console.error(error);
            throw error;
        }

        // Update the ticket
        try {
            return await TicketRepository.updateTicket(id, data);
        } catch (error){
            console.error(error);
            throw error;
        }
    }

    static async deleteTicket(id, data){
        // Check if the user is the owner of the ticket or an admin
        try {
            const ticket = await TicketRepository.getTicketById(id);
            if (ticket == null) {
                return 1;
            }
            if (ticket.id_user !== data.id && data.role !== 'admin') {
                return 2;
            }
        } catch (error){
            console.error(error);
            throw error;
        }

        // Delete the ticket
        try {
            await TicketRepository.deleteTicket(id);
            return 0;
        } catch (error){
            console.error(error);
            throw error;
        }
    }

    static async incrementTicketStatus(id) {
        try {
            const ticket = await TicketRepository.incrementTicketStatus(id);
            return ticket;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


static async addAnswerToTicket(ticketId, userId) {
    try {
        const ticket = await TicketRepository.getTicketById(ticketId);
        if (!ticket) {
            throw new Error('Ticket not found');
        }
        ticket.id_answer = userId;
        await ticket.save();
        return ticket;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
}

module.exports = TicketService;