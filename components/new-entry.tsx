'use client'

import {createNewEntry} from '@/lib/api'
import {Button} from './ui/button'
import {PlusIcon} from '@radix-ui/react-icons'
import {useRouter} from 'next/navigation'
import {toast} from './ui/use-toast'

export default function NewEntry() {
  const router = useRouter()
  const handleClick = async () => {
    toast({
      title: 'Creating your new entry...',
    })
    const entry = (await createNewEntry()) as Entry
    router.push(`/journal/${entry.id}`)
  }
  return (
    <>
      <Button onClick={handleClick}>
        <PlusIcon />
        <span>New Entry</span>
      </Button>
    </>
  )
}
