'use client'

import {useState} from 'react'
import {Input} from './ui/input'
import {Button} from './ui/button'

export default function Question() {
  const [value, setValue] = useState('')

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        console.log(value)
      }}
      className="flex gap-2"
    >
      <Input
        onChange={e => {
          setValue(e.target.value)
        }}
        type="text"
        placeholder="Ask a question"
      />
      <Button variant={'outline'} type="submit">
        Ask
      </Button>
    </form>
  )
}
