import Ask from '@/components/ask'
import {currentUser} from '@clerk/nextjs'

export default async function AskPage() {
  const user = await currentUser()
  if (!user) {
    throw new Error('No user id')
  }
  const {imageUrl, emailAddresses} = user
  console.log({imageUrl})

  return (
    <Ask image={imageUrl} initialLetter={emailAddresses[0].emailAddress[0]} />
  )
}
