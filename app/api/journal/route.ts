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
  revalidatePath('/journal')
  return NextResponse.json({data: entry})
}

// export async function GET(request: Request) {
//   return new Response('Hello world!')
// }
