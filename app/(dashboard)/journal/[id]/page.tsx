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
  const {analysis} = entry
  if (!analysis) {
    return <div>Ai is not cooking</div>
  }
  const {color, mood, negative, subject, summary} = analysis
  const analysisData = [
    {name: 'Summary', value: summary},
    {name: 'Subject', value: subject},
    {name: 'mood', value: mood},
    {name: 'Negative', value: negative ? 'true' : 'false'},
  ]
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="font-serif text-2xl font-semibold">
          Describe your day!
        </h2>
        <Editor entry={entry} />
      </div>
      <div className="space-y-2">
        <h2 className="font-serif text-3xl font-semibold">Analysis</h2>
        <div
          className="mt-2 h-4"
          style={{
            backgroundColor: color,
          }}
        ></div>
        <ul className="flex flex-col">
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
