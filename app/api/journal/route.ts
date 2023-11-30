import {analyzeEntry} from '@/lib/ai'
import {getUserByClerkID} from '@/lib/auth'
import {prisma} from '@/lib/db'
import {revalidatePath} from 'next/cache'
import {NextResponse} from 'next/server'

export const POST = async (request: Request) => {
  const user = await getUserByClerkID()
  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: 'Write About your day',
    },
  })

  const analysis = await analyzeEntry(entry.content)
  console.log(analysis)

  await prisma.analysis.create({
    data: {
      entryId: entry.id,
      mood: analysis.mood,
      subject: analysis.subject,
      negative: analysis.negative,
      summary: analysis.summary,
      color: analysis.color,
    },
  })

  revalidatePath('/journal')
  return NextResponse.json({data: entry})
}

// export async function GET(request: Request) {
//   return new Response('Hello world!')
// }
// {
//   mood: 'happy',
//   subject: 'My Day',
//   negative: false,
//   summary: 'Had a great day!',
//   color: '#00ff00',
//   sentimentScore: 8.5
// }
