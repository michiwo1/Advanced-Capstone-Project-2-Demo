import { prisma } from "@/lib/prisma";

export async function getLatestChartData() {
  try {
    const latestChartData = await prisma.chartData.findFirst({
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (!latestChartData) {
      return null;
    }

    return JSON.parse(latestChartData.chart_data);
  } catch (error) {
    console.error('Error fetching latest chart data:', error);
    return null;
  }
} 