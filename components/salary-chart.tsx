"use client"

import * as React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// サンプルデータ - 後で実際のデータに置き換え
const rawData = [380, 420, 510, 320, 750, 450, 490, 300, 610, 480, 520, 430, 670, 550, 20];
const bins = [300, 400, 500, 600, 700, 800];

function binData(data: number[], binEdges: number[]) {
  const counts = Array(binEdges.length - 1).fill(0);
  data.forEach(value => {
    for (let i = 0; i < binEdges.length - 1; i++) {
      if (value >= binEdges[i] && value < binEdges[i + 1]) {
        counts[i]++;
        break;
      }
    }
  });
  return counts;
}

const labels = [
  "200-299万",
  "300-399万",
  "400-499万",
  "500-599万",
  "600-699万",
  "700-799万",
  "800-899万",
  "900-999万",
  "1000-1099万",
  "1100-1199万",
  "1200-1299万",
];

export function SalaryChart() {
  const histogramCounts = binData(rawData, bins);

  const data = {
    labels,
    datasets: [
      {
        label: '給与分布',
        data: histogramCounts,
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: '割合'
        }
      },
      x: {
        title: {
          display: true,
          text: '年収レンジ'
        }
      }
    }
  };

  return <Bar data={data} options={options} />;
} 