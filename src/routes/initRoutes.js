const express = require('express');
const { initializeDatabase } = require('../controllers/initController');
const router = express.Router();

// Route to initialize and seed the database
router.get('/initialize', initializeDatabase);

module.exports = router;
