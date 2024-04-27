const express = require('express');
const TicketController = require('../controllers/ticket.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');

const router = express.Router();

router.put('/increment-status', [authMiddleware], TicketController.incrementTicketStatus);
router.post('/add-answer', [authMiddleware], TicketController.addAnswerToTicket);
router.get('/',[authMiddleware], TicketController.getAllTickets);
router.get('/me', [authMiddleware], TicketController.getSelfTickets);
router.get('/:id', [authMiddleware], TicketController.getTicketById);
router.post('/', [authMiddleware], TicketController.addTicket);
router.put('/:id', [authMiddleware], TicketController.updateTicket);
router.delete('/:id', [authMiddleware], TicketController.deleteTicket);


module.exports = router;