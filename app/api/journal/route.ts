import {analyzeEntry} from '@/lib/ai'
import {getUserByClerkID} from '@/lib/auth'
import {prisma} from '@/lib/db'
import {revalidatePath} from 'next/cache'
import {NextResponse} from 'next/server'

export const POST = async (request: Request) => {
  const data = await request.json()
  const user = await getUserByClerkID()
  const entry = await prisma.journalEntry.create({
    data: {
      content: data.content,
      user: {
        connect: {
          id: user.id,
        },
      },
      analysis: {
        create: {
          mood: 'Neutral',
          subject: 'None',
          negative: false,
          summary: 'None',
          sentimentScore: 0,
          color: '#3b82f6',
          userId: user.id,
        },
      },
    },
  })

  // update(['/journal'])
  revalidatePath('/journal')

  return NextResponse.json({data: entry})
}

// export const POST = async (request: Request) => {
//   const user = await getUserByClerkID()
//   const entry = await prisma.journalEntry.create({
//     data: {
//       userId: user.id,
//       content: 'Write About your day',
//     },
//   })

//   const analysis = await analyzeEntry(entry.content)

//   await prisma.analysis.create({
//     data: {
//       userId: user.id,
//       entryId: entry.id,
//       ...analysis,
//     },
//   })

//   revalidatePath('/journal')
//   return NextResponse.json({data: entry})
// }
