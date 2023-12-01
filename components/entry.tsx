import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function EntryCard({entry}: {entry: Omit<Entry, 'analysis'>}) {
  // return (
  //   <div>
  //     <h1>Entry Card</h1>
  //     <p>{entry.id}</p>
  //   </div>
  // )
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>{entry.id}</CardTitle>
        <CardDescription>
          {entry.createdAt.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{entry.content}</p>
      </CardContent>
    </Card>
  )
}
