import {qa} from '@/lib/ai'
import {getUserByClerkID} from '@/lib/auth'
import {prisma} from '@/lib/db'
import {NextResponse} from 'next/server'

export const POST = async (request: Request) => {
  const {question} = await request.json()
  const user = await getUserByClerkID()

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    select: {
      content: true,
      id: true,
      createdAt: true,
    },
  })

  const answer = await qa(question, entries)
  return NextResponse.json({data: answer})
}
