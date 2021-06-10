import React, { ReactElement } from 'react';
import { Line } from 'react-chartjs-2';
import { ChartOptions, ChartData } from 'chart.js';
import moment from 'moment';
import { DataPointReturn } from '../../utils/apiHelper';

interface Props {
    dataPoints: DataPointReturn[]
}

/**
 * Creates line graph using dataPoints
 * @param dataPoints DataPointReturn[]
 * @returns Returns graph component
 */
const ResultGraphs: React.FC<Props> = ({ dataPoints }): ReactElement => {
  const x: string[] = [];
  const y: number[] = [];

  // get time and wattage from dataPoints
  dataPoints.forEach((val) => {
    const values = Object.values(val);
    x.push(moment(values[0]).add(6, 'hours').format('LT'));
    y.push(values[1]);
  });
  console.log(dataPoints);

  const data: ChartData = {
    labels: x,
    datasets: [
      {
        label: 'Wattage',
        data: y,
        fill: false,
        backgroundColor: '#17173A',
        borderColor: '#17173A',
        pointBackgroundColor: '#17173A',
      },
    ],
  };

  const options: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          display: true,
        },
        beginAtZero: true,
        title: {
          text: 'Watts',
          display: true,
        },
      },
      x: {
        ticks: {
          display: true,
        },
        title: {
          text: 'Time',
          display: true,
        },
      },
    },
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 1,
      },
    },
  };

  return <Line type="line" data={data} options={options} />;
};

export default ResultGraphs;
