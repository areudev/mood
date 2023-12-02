import HistoryChart from '@/components/history-chart'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {getUserByClerkID} from '@/lib/auth'
import {prisma} from '@/lib/db'
const getData = async () => {
  const user = await getUserByClerkID()
  const analyses = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
  })

  if (!analyses.length) {
    return {
      analyses: [],
      avg: 0,
      total: 0,
    }
  }

  const sum = analyses.reduce((acc, curr) => acc + curr.sentimentScore, 0)
  const avg = Math.round(sum / analyses.length)
  return {
    analyses,
    avg,
    total: analyses.length,
  }
}

export default async function History() {
  const {analyses, avg, total} = await getData()

  return (
    <div className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center gap-2">
      <div className="flex gap-2 text-lg">
        <span>Average Sentiment Score:</span>
        <span className="font-bold">{avg}</span>
      </div>
      <div className="flex gap-2 text-lg">
        <span>Total Entries:</span>
        <span className="font-bold">{total}</span>
      </div>
      <div className="w-full pt-8">
        <div className="h-[400px] w-full">
          <HistoryChart data={analyses} />
        </div>
      </div>
    </div>
  )
}
