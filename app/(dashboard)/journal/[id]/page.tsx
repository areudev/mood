export default function EntryPage({params}: {params: {id: string}}) {
  return (
    <div>
      <h1>Entry Page</h1>
      <p>{params.id}</p>
    </div>
  )
}
