import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({data}) => {
  return (
    <div>
        <Doughnut data={data} />
    </div>
  )
}

export default DoughnutChart