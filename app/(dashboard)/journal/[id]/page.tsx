import {Editor} from '@/components/editor'
import {getUserByClerkID} from '@/lib/auth'
import {prisma} from '@/lib/db'

const getEntry = async (id: string) => {
  const user = await getUserByClerkID()
  const entry = await prisma.journalEntry.findUnique({
    where: {
      id,
    },
  })
}

export default function EntryPage({params}: {params: {id: string}}) {
  return (
    <div>
      <h1>Entry Page</h1>
      {/* <Editor /> */}
    </div>
  )
}
