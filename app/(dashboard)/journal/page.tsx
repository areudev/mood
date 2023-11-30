import EntryCard from '@/components/entry'
import NewEntry from '@/components/new-entry'
import {analyzeEntry} from '@/lib/ai'
import {getUserByClerkID} from '@/lib/auth'
import {prisma} from '@/lib/db'
import Link from 'next/link'

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

  console.log(await analyzeEntry('Today  the weather was bad.'))

  return entries
}

export default async function JournalPage() {
  const entries = await getEntries()

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
        <h2 className="font-serif text-2xl font-semibold ">Journal</h2>
        <NewEntry />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4">
        {entries.map(entry => (
          <Link key={entry.id} href={`/journal/${entry.id}`}>
            <EntryCard entry={entry} />
          </Link>
        ))}
        {/* {[1, 2, 3, 4, 5, 6, 7, 8].map((entry, index) => (
          <EntryCard key={index} entry={entry} />
        ))} */}
      </div>
    </div>
  )
}
