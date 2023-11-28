import EntryCard from '@/components/entry'
import NewEntry from '@/components/new-entry'
import {getUserByClerkID} from '@/lib/auth'
import {prisma} from '@/lib/db'

const getEntries = async () => {
  const user = await getUserByClerkID()

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return entries
}

export default async function JournalPage() {
  const entries = await getEntries()
  console.log('entries', entries)

  return (
    <div>
      <h2 className="font-serif text-2xl font-semibold ">Journal</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4">
        <NewEntry />
        {entries.map(entry => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  )
}
