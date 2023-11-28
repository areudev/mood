export default function EntryCard({
  entry,
}: {
  entry: {
    id: string
    createdAt: Date
    updatedAt: Date
    userId: string
    content: string
  }
}) {
  return (
    <div>
      <h1>Entry Card</h1>
      <p>{entry.id}</p>
    </div>
  )
}
