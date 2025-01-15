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

export async function getLatestChartData(): Promise<ChartData | null> {
  try {
    const latestChartData = await prisma.chartData.findFirst({
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (!latestChartData) {
      console.warn('No chart data found in database');
      return null;
    }

    try {
      const parsedData = JSON.parse(latestChartData.chart_data) as ChartData;
      if (!parsedData.labels || !parsedData.datasets) {
        console.error('Invalid chart data format');
        return null;
      }
      return parsedData;
    } catch (parseError) {
      console.error('Error parsing chart data JSON:', parseError);
      return null;
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(`Database error: ${error.code}`, error.message);
    } else {
      console.error('Error fetching latest chart data:', error);
    }
    throw error; // Re-throw to handle in the UI layer
  }
} 