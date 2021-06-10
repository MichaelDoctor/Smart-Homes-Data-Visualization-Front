import React, { ReactElement } from 'react';
import { Line } from 'react-chartjs-2';
import { ChartOptions, ChartData } from 'chart.js';

const ResultGraphs: React.FC = (): ReactElement => {
  const data: ChartData = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  const options: ChartOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Title',
      },
      legend: {
        display: true,
        position: 'bottom',
      },
    },
    responsive: true,
    scales: {
      y: {
        ticks: {
          display: true,
        },
        beginAtZero: true,
        title: {
          text: 'Y Axis',
          display: true,
        },
      },
    },
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 10,
      },
    },
  };

  return <Line type="line" data={data} options={options} />;
};

export default ResultGraphs;
