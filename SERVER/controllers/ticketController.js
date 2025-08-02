const db = require('../config/db');

exports.createTicket = (req, res) => {
  const { user_id, subject, description, category } = req.body;

  db.query(
    'INSERT INTO tickets (user_id, subject, description, category) VALUES (?, ?, ?, ?)',
    [user_id, subject, description, category],
    (err, result) => {
      if (err) {
        console.error("DB Error:", err);
        return res.status(500).json({ error: 'Database error', details: err });
      }
      res.status(201).json({ message: 'Ticket created successfully' });
    }
  );
};

exports.getMyTickets = (req, res) => {
  const user_id = req.params.user_id;

  db.query(
    'SELECT * FROM tickets WHERE user_id = ? ORDER BY created_at DESC',
    [user_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error', details: err });
      res.status(200).json(results);
    }
  );
};

exports.updateTicketStatus = (req, res) => {
  const { ticket_id, status, agent_id } = req.body;

  db.query(
    'UPDATE tickets SET status = ?, agent_id = ? WHERE id = ?',
    [status, agent_id, ticket_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Database error', details: err });
      res.status(200).json({ message: 'Ticket status updated' });
    }
  );
};

exports.getMyTicketSummary = (req, res) => {
  const user_id = req.params.user_id;

  db.query(
    `SELECT status, COUNT(*) as count
     FROM tickets
     WHERE user_id = ?
     GROUP BY status`,
    [user_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error', details: err });
      res.status(200).json(results);
    }
  );
};
