import HistoryChart from '@/components/history-chart'
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
    }
  }

  const sum = analyses.reduce((acc, curr) => acc + curr.sentimentScore, 0)
  const avg = Math.round(sum / analyses.length)
  return {
    analyses,
    avg,
  }
}

export default async function History() {
  const {analyses, avg} = await getData()
  console.log(analyses)
  return (
    <div>
      <div>{`Average Sentiment ${avg}`}</div>
      <div className="h-[400px]">
        <HistoryChart data={analyses} />
      </div>
    </div>
  )
}
