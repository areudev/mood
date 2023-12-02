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

  const analysis = await analyzeEntry(updatedEntry.content)

  // const updatedAnalysis = await prisma.analysis.upsert({
  //   where: {
  //     entryId: updatedEntry.id,
  //   },
  //   update: {
  //     color,
  //     mood,
  //     negative,
  //     subject,
  //     summary,
  //     sentimentScore,
  //   },
  //   create: {
  //     entry: {
  //       connect: {
  //         id: updatedEntry.id,
  //       },
  //     },

  //     color,
  //     mood,
  //     negative,
  //     subject,
  //     summary,
  //     sentimentScore,
  //   },
  // })
  const savedAnalysis = await prisma.analysis.upsert({
    where: {
      entryId: updatedEntry.id,
    },
    update: {...analysis},
    create: {
      entryId: updatedEntry.id,
      userId: user.id,
      ...analysis,
    },
  })
  revalidatePath('/journal')
  return NextResponse.json({data: {...updatedEntry, analysis: savedAnalysis}})
}

// import {analyzeEntry} from '@/lib/ai'
// import {getUserByClerkID} from '@/lib/auth'
// import {prisma} from '@/lib/db'
// import {NextResponse} from 'next/server'

// export const DELETE = async (request: Request, {params}) => {
//   const user = await getUserFromClerkID()

//   await prisma.journalEntry.delete({
//     where: {
//       userId_id: {
//         id: params.id,
//         userId: user.id,
//       },
//     },
//   })

//   update(['/journal'])

//   return NextResponse.json({data: {id: params.id}})
// }

// export const PATCH = async (
//   request: Request,
//   {
//     params,
//   }: {
//     params: {id: string}
//   },
// ) => {
//   const {updates} = await request.json()
//   const user = await getUserByClerkID()

//   const entry = await prisma.journalEntry.update({
//     where: {
//       userId_id: {
//         id: params.id,
//         userId: user.id,
//       },
//     },
//     data: updates,
//   })

//   const analysis = await analyzeEntry(entry.content)
//   const savedAnalysis = await prisma.analysis.upsert({
//     where: {
//       entryId: entry.id,
//     },
//     update: {...analysis},
//     create: {
//       entryId: entry.id,
//       userId: user.id,
//       ...analysis,
//     },
//   })

//   // update(['/journal'])

//   return NextResponse.json({data: {...entry, analysis: savedAnalysis}})
// }
