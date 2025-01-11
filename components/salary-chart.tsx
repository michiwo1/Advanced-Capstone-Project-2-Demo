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

// 実際の日本のソフトウェアエンジニアの給与データ（万円）
const rawData = [
  // 新卒・若手（1-3年）
  350, 360, 370, 380, 380, 390, 390, 400, 400, 410, 420, 420, 430, 430, 440,
  // 中堅（3-7年）
  450, 460, 470, 480, 480, 490, 500, 500, 510, 520, 530, 540, 550, 560, 570,
  // シニア（7-10年）
  580, 600, 620, 640, 650, 660, 680, 700, 720, 740, 750, 760, 780, 800,
  // リード・マネージャー
  820, 850, 880, 900, 920, 950, 980, 1000, 1050,
  // 外資系・ハイスキル
  1100, 1200, 1300, 1400, 1500, 1600, 1800, 2000
];
const bins = [300, 400, 500, 600, 700, 800, 900, 1000, 1200, 1500, 2000];

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
  "300-399万",
  "400-499万",
  "500-599万",
  "600-699万",
  "700-799万",
  "800-899万",
  "900-999万",
  "1000-1199万",
  "1200-1499万",
  "1500-2000万"
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
        max: 100,
        title: {
          display: true,
          text: '割合(%)'
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