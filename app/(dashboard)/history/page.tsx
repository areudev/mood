import {getUserByClerkID} from '@/lib/auth'
import {prisma} from '@/lib/db'
const getData = async () => {
  const user = await getUserByClerkID()
  const analyses = await prisma.analysis.findMany({})
}

export default async function History() {
  // const user = await getUserByClerkID()

  return <div>History</div>
}
