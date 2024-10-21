import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getBarChartData } from '../api';

const BarChart = ({ month }) => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        fetchBarChartData();
    }, [month]);

    const fetchBarChartData = async () => {
        try {
            const response = await getBarChartData(month);
            const data = response.data;
            const labels = data.map((item) => item.range);
            const values = data.map((item) => parseInt(item.count, 10));

            setChartData({
                labels,
                datasets: [
                    {
                        label: 'Number of Items',
                        data: values,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)'
                    }
                ]
            });
        } catch (error) {
            console.error('Error fetching bar chart data', error);
        }
    };

    return (
        <div className="bar-chart">
            <Bar
                data={chartData}
                options={{
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }}
            />
        </div>
    );
};

export default BarChart;
