'use client'

import {useState} from 'react'
import {Input} from './ui/input'
import {Button} from './ui/button'
import {askQuestion} from '@/lib/api'

export default function Question() {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [answer, setAnswer] = useState('')
  return (
    <div>
      <form
        onSubmit={async e => {
          e.preventDefault()
          if (!value) return

          setLoading(true)
          const answer = await askQuestion(value)
          setAnswer(answer)
          setValue('')
          setLoading(false)
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
        <Button disabled={loading} variant={'outline'} type="submit">
          {loading ? 'Loading...' : 'Ask'}
        </Button>
      </form>
      {answer && (
        <div className="mt-4">
          <p className="text-sm">Answer</p>
          <p className="text-lg">{answer}</p>
        </div>
      )}
    </div>
  )
}
