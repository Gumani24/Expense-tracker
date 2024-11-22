const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db.config');

const app = express();
app.use(cors());
app.use(express.json());

// Import Routes
const authRoutes = require('./routes/auth.routes');
const expenseRoutes = require('./routes/expense.routes');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

// Test DB Connection
sequelize.sync()
  .then(() => {
    console.log('Database connected.');
  })
  .catch(err => {
    console.log('Error:', err);
  });

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});