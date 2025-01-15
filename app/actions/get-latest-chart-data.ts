'use server'

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
  }>;
}

const defaultChartData: ChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Market Trend',
      data: [65, 59, 80, 81, 56, 55],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }
  ]
};

export async function getLatestChartData(): Promise<ChartData> {
  try {
    const latestChartData = await prisma.chartData.findFirst({
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (!latestChartData) {
      console.warn('No chart data found in database, using default data');
      return defaultChartData;
    }

    try {
      const parsedData = JSON.parse(latestChartData.chart_data) as ChartData;
      return parsedData;
    } catch (parseError) {
      console.error('Error parsing chart data JSON:', parseError);
      return defaultChartData;
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(`Database error: ${error.code}`, error.message);
    } else {
      console.error('Error fetching latest chart data:', error);
    }
    return defaultChartData;
  }
}