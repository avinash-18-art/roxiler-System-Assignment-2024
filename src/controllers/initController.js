const axios = require('axios');
const pool = require('../config/db');
const { createTable } = require('../models/Transaction');

// Initialize database and seed data from third-party API
const initializeDatabase = async (req, res) => {
    try {
        // Create table if not exists
        await createTable();

        // Fetch data from third-party API
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const transactions = response.data;

        // Insert data into database
        const insertQuery = `
            INSERT INTO product_transactions (title, description, price, category, date_of_sale, sold)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;
        for (let transaction of transactions) {
            await pool.query(insertQuery, [
                transaction.title, transaction.description, transaction.price, transaction.category, 
                transaction.dateOfSale, transaction.sold
            ]);
        }

        res.status(200).send('Database initialized and data seeded');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error initializing database');
    }
};

module.exports = { initializeDatabase };
