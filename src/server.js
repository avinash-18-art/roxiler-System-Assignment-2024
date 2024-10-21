const express = require('express');
const app = express();
require('dotenv').config();

// Import routes
const initRoutes = require('./routes/initRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

// Middleware
app.use(express.json());

// Use routes
app.use('/api', initRoutes);
app.use('/api', transactionRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
