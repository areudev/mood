import {analyzeEntry} from '@/lib/ai'
import {getUserByClerkID} from '@/lib/auth'
import {prisma} from '@/lib/db'
import {revalidatePath} from 'next/cache'
import {NextResponse} from 'next/server'

export const PATCH = async (
  request: Request,
  {
    params,
  }: {
    params: {id: string}
  },
) => {
  const {updates} = await request.json()
  const user = await getUserByClerkID()
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content: updates,
    },
  })

  const {color, mood, negative, sentimentScore, subject, summary} =
    await analyzeEntry(updates)

  const updatedAnalysis = await prisma.analysis.upsert({
    where: {
      entryId: updatedEntry.id,
    },
    update: {
      color,
      mood,
      negative,
      subject,
      summary,
    },
    create: {
      entry: {
        connect: {
          id: updatedEntry.id,
        },
      },
      color,
      mood,
      negative,
      subject,
      summary,
    },
  })
  return NextResponse.json({data: {...updatedEntry, analysis: updatedAnalysis}})
}
