const express = require('express');
const {
    listTransactions, getStatistics, getBarChartData, getPieChartData, getCombinedData
} = require('../controllers/transactionController');

const router = express.Router();

// Routes for transactions, statistics, and chart data
router.get('/transactions', listTransactions);
router.get('/statistics', getStatistics);
router.get('/bar-chart', getBarChartData);
router.get('/pie-chart', getPieChartData);
router.get('/combined-data', getCombinedData);

module.exports = router;
