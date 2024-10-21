import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Fetch transactions list with pagination and search
export const getTransactions = (month, search = '', page = 1, perPage = 10) => {
    return axios.get(`${API_URL}/transactions`, {
        params: { month, search, page, perPage }
    });
};

// Fetch statistics for selected month
export const getStatistics = (month) => {
    return axios.get(`${API_URL}/statistics`, {
        params: { month }
    });
};

// Fetch bar chart data for selected month
export const getBarChartData = (month) => {
    return axios.get(`${API_URL}/bar-chart`, {
        params: { month }
    });
};
