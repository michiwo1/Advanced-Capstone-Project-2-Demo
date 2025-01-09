import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const industries = [
  'IT・通信',
  '金融',
  '製造',
  '小売・サービス',
  '医療・福祉',
]

// 業界ごとの年収範囲（最小値、最大値）
const industryRanges = {
  'IT・通信': [350, 800],
  '金融': [400, 900],
  '製造': [300, 700],
  '小売・サービス': [280, 600],
  '医療・福祉': [320, 650],
}

// ランダムな年収を生成する関数
function generateRandomSalary(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

async function main() {
  // 既存のデータを削除
  await prisma.salaryData.deleteMany()

  // 業界ごとにサンプルデータを生成
  for (const industry of industries) {
    const range = industryRanges[industry as keyof typeof industryRanges]
    // 各業界で30件のサンプルデータを生成
    const salaryData = Array.from({ length: 30 }, () => ({
      salary: generateRandomSalary(range[0], range[1]),
      industry: industry,
    }))

    await prisma.salaryData.createMany({
      data: salaryData,
    })
  }

  console.log('Seed data has been inserted')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 