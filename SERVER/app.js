const express = require('express');
const cors = require('cors');
const app = express();

const loginRoutes = require('./routes/loginRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

app.use(cors());
app.use(express.json());
app.use('/api/users', loginRoutes);
app.use('/api/tickets', ticketRoutes);

app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});

