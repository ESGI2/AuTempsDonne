const express = require('express');
const TicketController = require('../controllers/ticket.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');
const isResponsable = require('../middlewares/isResponsible');

const router = express.Router();

router.put('/increment-status/:id', [authMiddleware, isResponsable], TicketController.incrementTicketStatus);
router.post('/add-answer', [authMiddleware, isResponsable], TicketController.addAnswerToTicket);
router.get('/',[authMiddleware, isResponsable], TicketController.getAllTickets);
router.get('/me', [authMiddleware, isResponsable], TicketController.getSelfTickets);
router.get('/:id', [authMiddleware, isResponsable], TicketController.getTicketById);
router.post('/', [authMiddleware], TicketController.addTicket);
router.put('/:id', [authMiddleware, isResponsable], TicketController.updateTicket);
router.delete('/:id', [authMiddleware, isAdmin], TicketController.deleteTicket);


module.exports = router;