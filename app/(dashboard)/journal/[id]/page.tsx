import {Editor} from '@/components/editor'
import {Toaster} from '@/components/ui/toaster'
import {getUserByClerkID} from '@/lib/auth'
import {prisma} from '@/lib/db'

const analysisData = [
  {name: 'Summary', value: ''},
  {name: 'Subject', value: ''},
  {name: 'Mood', value: ''},
  {name: 'Negative', value: false},
]

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
    <div className="space-y-4">
      <div>
        <h2 className="font-serif text-2xl font-semibold">Entry {entry.id}</h2>
        <Editor entry={entry} />
      </div>
      <div className="space-y-2">
        <h2 className="font-serif text-3xl font-semibold">Analysis</h2>
        <ul>
          {analysisData.map(item => (
            <li key={item.name} className="flex items-center gap-2 text-lg">
              <span className="font-semibold">{item.name}:</span>
              <span>{item.value}</span>
            </li>
          ))}
        </ul>
      </div>
      <Toaster />
    </div>
  )
}
