'use client'

import {useState} from 'react'
import {Textarea} from './ui/textarea'
import {useAutosave} from 'react-autosave'
import {updateEntry} from '@/lib/api'
import {toast} from './ui/use-toast'

export const Editor = ({entry: {content, id}}: {entry: Entry}) => {
  const [value, setValue] = useState(content)
  const [saving, setSaving] = useState(false)
  useAutosave({
    data: value,
    onSave: async update => {
      setSaving(true)
      const updated = await updateEntry(id, update)
      toast({
        title: 'Saved',
      })
      setSaving(false)
    },
  })
  return (
    <div className="w-full ">
      <Textarea
        className="text-lg "
        rows={10}
        value={value}
        onChange={e => {
          setValue(e.target.value)
        }}
      />
      {saving && <div>Saving...</div>}
    </div>
  )
}
