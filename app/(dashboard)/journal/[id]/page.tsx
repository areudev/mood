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
    include: {
      analysis: true,
    },
  })

  return entry
}

export default async function JournalPage({params}: {params: {id: string}}) {
  const entry = await getEntry(params.id)

  if (!entry) {
    return <div>Entry not found</div>
  }

  // @ts-expect-error
  return <Editor entry={entry} />
}
