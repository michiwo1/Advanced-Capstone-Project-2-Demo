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

interface MarketChartProps {
  chartData: Record<string, number>;
}

export function MarketChart({ chartData }: MarketChartProps) {
  const dummyData = {
  "実務経験・職務レベル": 40,
  "専門スキル・技術力": 45,
  "実績・成果": 40,
  "ソフトスキル・コミュニケーション": 30,
  "業界・領域知識": 30,
  "キャリア成長度・適応力": 40
}

  let labels: string[];
  let data: number[];

  try {
    if (!chartData || Object.keys(chartData).length === 0) {
      throw new Error('Invalid chart data');
    }
    labels = Object.keys(chartData);
    data = Object.values(chartData);
  } catch (error) {
    console.error('Error processing chart data:', error);
    labels = Object.keys(dummyData);
    data = Object.values(dummyData);
  }

  const marketData = {
    labels: labels,
    datasets: [
      {
        label: 'スキル評価',
        data: data,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  }

  return <Radar data={marketData} options={chartOptions} />
} 