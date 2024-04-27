const Ticket = require('../models/ticket.model');
const moment = require("moment-timezone");
const Stock = require("../models/stock.model");
class TicketRepository {
    static async getAllTickets() {
        try {
            return await Ticket.findAll();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getTicketById(id) {
        try {
            return await Ticket.findByPk(id);
        } catch (error) {
            console.error(error);
            throw error;
        }

    }

    static async getSelfTickets(id) {
        try {
            return await Ticket.findAll({where: {id_user: id}});
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async addTicket(user_data) {
        try {
            return await Ticket.create({
                title: user_data.title,
                message: user_data.message,
                date_creation: moment().tz('Europe/Paris').format('YYYY-MM-DD HH:mm:ss'),
                id_user: user_data.user_id,
                id_answer: null,
                status: 0
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async updateTicket(id, user_data) {
        try {
            return await Ticket.update({
                message: user_data.message,
            }, {
                where: {
                    id: id,
                }
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async deleteTicket(id) {
        try {
            return await Ticket.destroy({
                where: {
                    id: id
                }
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async incrementTicketStatus(id) {
        try {
            return Ticket.increment("status", {where : {id : id}});
        } catch (error) {
            console.error(error);
            throw error;
        }

    }
}

module.exports = TicketRepository;