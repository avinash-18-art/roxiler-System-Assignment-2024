const pool = require('../config/db');

// List transactions with search and pagination
const listTransactions = async (req, res) => {
    const { search = '', page = 1, perPage = 10 } = req.query;
    const offset = (page - 1) * perPage;

    try {
        const query = `
            SELECT * FROM product_transactions
            WHERE (title ILIKE $1 OR description ILIKE $1 OR CAST(price AS TEXT) ILIKE $1)
            LIMIT $2 OFFSET $3
        `;
        const result = await pool.query(query, [`%${search}%`, perPage, offset]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching transactions');
    }
};

// Get statistics (total sales, sold, unsold items)
const getStatistics = async (req, res) => {
    const { month } = req.query;
    const monthNumber = new Date(`${month} 1, 2000`).getMonth() + 1;

    try {
        const totalSalesQuery = `
            SELECT SUM(price) FROM product_transactions
            WHERE EXTRACT(MONTH FROM date_of_sale) = $1 AND sold = true
        `;
        const soldItemsQuery = `
            SELECT COUNT(*) FROM product_transactions
            WHERE EXTRACT(MONTH FROM date_of_sale) = $1 AND sold = true
        `;
        const unsoldItemsQuery = `
            SELECT COUNT(*) FROM product_transactions
            WHERE EXTRACT(MONTH FROM date_of_sale) = $1 AND sold = false
        `;
        const totalSales = await pool.query(totalSalesQuery, [monthNumber]);
        const soldItems = await pool.query(soldItemsQuery, [monthNumber]);
        const unsoldItems = await pool.query(unsoldItemsQuery, [monthNumber]);

        res.json({
            totalSales: totalSales.rows[0].sum,
            soldItems: soldItems.rows[0].count,
            unsoldItems: unsoldItems.rows[0].count
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching statistics');
    }
};

// Bar chart (price ranges)
const getBarChartData = async (req, res) => {
    const { month } = req.query;
    const monthNumber = new Date(`${month} 1, 2000`).getMonth() + 1;

    const ranges = [
        [0, 100], [101, 200], [201, 300], [301, 400],
        [401, 500], [501, 600], [601, 700], [701, 800],
        [801, 900], [901, Infinity]
    ];

    try {
        const result = [];
        for (let [min, max] of ranges) {
            const query = `
                SELECT COUNT(*) FROM product_transactions
                WHERE EXTRACT(MONTH FROM date_of_sale) = $1
                AND price BETWEEN $2 AND $3
            `;
            const count = await pool.query(query, [monthNumber, min, max === Infinity ? 999999 : max]);
            result.push({ range: `${min}-${max}`, count: count.rows[0].count });
        }
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching bar chart data');
    }
};

// Pie chart (unique categories)
const getPieChartData = async (req, res) => {
    const { month } = req.query;
    const monthNumber = new Date(`${month} 1, 2000`).getMonth() + 1;

    try {
        const query = `
            SELECT category, COUNT(*) FROM product_transactions
            WHERE EXTRACT(MONTH FROM date_of_sale) = $1
            GROUP BY category
        `;
        const result = await pool.query(query, [monthNumber]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching pie chart data');
    }
};

// Combined data API
const getCombinedData = async (req, res) => {
    const { month } = req.query;

    try {
        const [statistics, barChart, pieChart] = await Promise.all([
            axios.get(`/statistics?month=${month}`),
            axios.get(`/bar-chart?month=${month}`),
            axios.get(`/pie-chart?month=${month}`)
        ]);

        res.json({
            statistics: statistics.data,
            barChart: barChart.data,
            pieChart: pieChart.data
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching combined data');
    }
};

module.exports = {
    listTransactions,
    getStatistics,
    getBarChartData,
    getPieChartData,
    getCombinedData
};
