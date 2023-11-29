import {getUserByClerkID} from '@/lib/auth'
import {prisma} from '@/lib/db'
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

  return NextResponse.json({data: updatedEntry})

  // return new Response(JSON.stringify(updatedEntry), {
  //   headers: {'content-type': 'application/json'},
  // })
}
