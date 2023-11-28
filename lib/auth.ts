import {auth} from '@clerk/nextjs'
import {prisma} from './db'

export const getUserByClerkID = async () => {
  const {userId} = auth()

  if (!userId) {
    throw new Error('No user ID found')
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  })

  if (!user) {
    throw new Error('No user found')
  }
  return user
}
