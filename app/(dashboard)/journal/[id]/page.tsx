import {Editor} from '@/components/editor'
import {Toaster} from '@/components/ui/toaster'
import {getUserByClerkID} from '@/lib/auth'
import {prisma} from '@/lib/db'

const getEntry = async (id: string) => {
  const user = await getUserByClerkID()
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
  })

  return entry
}

export default async function EntryPage({params}: {params: {id: string}}) {
  const entry = await getEntry(params.id)
  if (!entry) {
    return <div>Entry not found</div>
  }
  return (
    <div>
      <h2 className="font-serif text-2xl font-semibold">Entry {entry.id}</h2>
      <p>{params.id}</p>
      <Editor entry={entry} />
      <Toaster />
    </div>
  )
}
