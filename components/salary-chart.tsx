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

// Actual salary data for software engineers in North America (in USD)
const rawData = [
  // Entry level / Junior (0-3 years)
  75000, 80000, 85000, 90000, 95000, 100000, 105000, 110000, 115000, 120000,
  // Mid-level (3-5 years)
  120000, 130000, 140000, 150000, 160000, 170000, 180000, 190000, 200000,
  // Senior (5-8 years)
  180000, 190000, 200000, 210000, 220000, 230000, 240000, 250000, 260000,
  // Staff / Lead (8+ years)
  250000, 270000, 290000, 310000, 330000, 350000,
  // Senior Staff / Principal
  350000, 380000, 400000, 420000, 450000,
  // FAANG / Top Tech
  400000, 450000, 500000, 550000, 600000, 650000, 700000, 800000
];
const bins = [70000, 100000, 150000, 200000, 250000, 300000, 350000, 400000, 500000, 800000];

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
  const total = counts.reduce((sum, count) => sum + count, 0);
  return counts.map(count => (count / total) * 100);
}

const labels = [
  "$70-99K",
  "$100-149K",
  "$150-199K",
  "$200-249K",
  "$250-299K",
  "$300-349K",
  "$350-399K",
  "$400-499K",
  "$500K+"
];

export function SalaryChart() {
  const histogramCounts = binData(rawData, bins);

  const data = {
    labels,
    datasets: [
      {
        label: 'Salary Distribution',
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
        max: 25,
        title: {
          display: true,
          text: 'Percentage (%)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Annual Salary Range'
        }
      }
    }
  };

  return <Bar data={data} options={options} />;
} 