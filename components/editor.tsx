'use client'

import {useState} from 'react'
import {Textarea} from './ui/textarea'
import {useAutosave} from 'react-autosave'
import {updateEntry} from '@/lib/api'
import {toast} from './ui/use-toast'
import {Analysis, JournalEntry} from '@prisma/client'

export const Editor = ({
  entry,
}: {
  entry: JournalEntry & {analysis: Analysis}
}) => {
  const [currentEntry, setCurrentEntry] = useState(entry)
  const [value, setValue] = useState(entry.content)
  const [saving, setSaving] = useState(false)
  useAutosave({
    data: value,
    onSave: async update => {
      if (value === entry.content) return
      setSaving(true)
      toast({
        title: 'Saving...',
      })
      const data = await updateEntry(entry.id, update)
      setCurrentEntry(data)
      toast({
        title: 'Saved',
      })
      setSaving(false)
    },
    interval: 4000,
  })

  const {
    color = '',
    mood = '',
    negative = false,
    subject = '',
    summary = '',
    sentimentScore = 0,
  } = currentEntry.analysis
  const analysisData = [
    {name: 'Summary', value: summary},
    {name: 'Subject', value: subject},
    {name: 'mood', value: mood},
    {name: 'Negative', value: negative ? 'true' : 'false'},
    {name: 'Sentiment Score', value: sentimentScore},
  ]
  return (
    <div className="w-full">
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="font-serif text-2xl font-semibold">
            Describe your day!
          </h2>
          <Textarea
            className="text-lg "
            rows={10}
            value={value}
            onChange={e => {
              setValue(e.target.value)
            }}
          />
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="font-serif text-3xl font-semibold">Analysis</h2>
        <div
          className="mt-2 h-4"
          style={{
            backgroundColor: color,
          }}
        ></div>
        <ul className="flex flex-col">
          {analysisData.map(item => (
            <li key={item.name} className="flex items-center gap-2 text-lg">
              <span className="font-semibold">{item.name}:</span>
              <span>{item.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
