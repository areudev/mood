type Entry = {
  id: string
  createdAt: Date
  updatedAt: Date
  userId: string
  content: string
  analysis: {
    id: string
    createdAt: Date
    updatedAt: Date
    entryId: string
    mood: string
    color: string
    negative: boolean
    summary: string
    subject: string
  }
}
