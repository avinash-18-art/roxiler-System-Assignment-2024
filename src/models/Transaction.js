const pool = require('../config/db');

const createTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS product_transactions (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255),
            description TEXT,
            price DECIMAL(10, 2),
            category VARCHAR(100),
            date_of_sale DATE,
            sold BOOLEAN
        );
    `;
    await pool.query(query);
};

module.exports = { createTable };
