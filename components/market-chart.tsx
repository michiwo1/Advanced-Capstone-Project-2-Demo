"use client"
import * as React from 'react'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

const marketData = {
  labels: ['IT/Tech', 'Finance', 'Healthcare', 'Education', 'Manufacturing', 'Retail'],
  datasets: [
    {
      label: '求人数の傾向',
      data: [90, 75, 85, 65, 70, 60],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    },
  ],
}

const chartOptions = {
  scales: {
    r: {
      beginAtZero: true,
      max: 100,
      ticks: {
        stepSize: 20,
      },
    },
  },
}

export function MarketChart() {
  return <Radar data={marketData} options={chartOptions} />
} 