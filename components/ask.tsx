'use client'
import {useState} from 'react'
import {Input} from './ui/input'
import {Button} from './ui/button'
import {askQuestion} from '@/lib/api'
import {Avatar, AvatarFallback, AvatarImage} from './ui/avatar'
import {cn} from '@/lib/utils'

export default function ChatInterface({
  image,
  initialLetter = 'A',
}: {
  image: string
  initialLetter: string
}) {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<
    {
      text: string
      sender: 'user' | 'bot'
      temp?: boolean
    }[]
  >([{text: 'Hello! How can I assist you today?', sender: 'bot'}])

  const sendMessage = async () => {
    if (!value) return
    setLoading(true)
    setMessages([
      ...messages,
      {text: value, sender: 'user'},
      {text: 'Yo, let me think...', sender: 'bot', temp: true},
    ])
    setValue('')
    const answer = await askQuestion(value)
    setMessages(prevMessages =>
      prevMessages.map(msg => (msg.temp ? {text: answer, sender: 'bot'} : msg)),
    )

    setLoading(false)
  }

  return (
    <div
      style={{
        height: 'calc(100vh - 120px)',
      }}
      className="mx-auto flex max-w-3xl flex-col justify-end"
    >
      <div className="space-y-4 overflow-y-auto py-10">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start ${
              message.sender === 'user' ? 'justify-end' : ''
            } space-x-2`}
          >
            {message.sender === 'user' ? null : (
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>B</AvatarFallback>
              </Avatar>
            )}
            <div
              className={cn(
                'max-w-md rounded-lg bg-muted p-2',
                message.temp && 'animate-pulse',
              )}
            >
              <p className={cn('text-sm')}>{message.text}</p>
            </div>
            {message.sender === 'bot' ? null : (
              <Avatar>
                <AvatarImage src={image} alt="@shadcn" />
                <AvatarFallback>{initialLetter}</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      </div>

      <div className="rounded-lg">
        <form
          onSubmit={e => {
            e.preventDefault()
            sendMessage()
          }}
          className="flex justify-center space-x-2"
        >
          <Input
            className="py-[19px]"
            onChange={e => setValue(e.target.value)}
            type="text"
            placeholder="Type your message..."
            value={value}
          />
          <Button size={'lg'} disabled={loading} type="submit">
            Ask
          </Button>
        </form>
      </div>
    </div>
  )
}
