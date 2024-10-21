import React, { useEffect, useState } from 'react';
import { getStatistics } from '../api';

const Statistics = ({ month }) => {
    const [stats, setStats] = useState({
        totalSales: 0,
        soldItems: 0,
        unsoldItems: 0
    });

    useEffect(() => {
        fetchStatistics();
    }, [month]);

    const fetchStatistics = async () => {
        try {
            const response = await getStatistics(month);
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching statistics', error);
        }
    };

    return (
        <div className="statistics">
            <div>Total Sale Amount: {stats.totalSales}</div>
            <div>Total Sold Items: {stats.soldItems}</div>
            <div>Total Unsold Items: {stats.unsoldItems}</div>
        </div>
    );
};

export default Statistics;
