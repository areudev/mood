'use client'

import {createNewEntry} from '@/lib/api'
import {Button} from './ui/button'
import {PlusIcon} from '@radix-ui/react-icons'
import {useRouter} from 'next/navigation'

export default function NewEntry() {
  const router = useRouter()
  const handleClick = async () => {
    await createNewEntry()
    router.push('/journal')
  }
  return (
    <Button onClick={handleClick}>
      <PlusIcon />
      <span>New Entry</span>
    </Button>
  )
}
