const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

router.post('/create', ticketController.createTicket);
router.get('/user/:user_id', ticketController.getMyTickets);
router.get('/summary/:user_id', ticketController.getMyTicketSummary);
router.put('/update', ticketController.updateTicketStatus);

module.exports = router;