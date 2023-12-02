import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {Analysis, JournalEntry} from '@prisma/client'
import {Button} from './ui/button'

export default function EntryCard({
  entry,
}: {
  entry: JournalEntry & {
    analysis: Analysis | null
  }
}) {
  if (!entry.analysis) {
    return (
      <Card className="transition-shadow duration-200 ease-in-out hover:shadow-lg">
        <CardHeader>
          <CardTitle>
            {entry.createdAt.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2">
            {entry.content.length > 30
              ? entry.content.slice(0, 27) + '...'
              : entry.content}
          </p>
          <div
            style={{
              backgroundColor: '#000000',
            }}
            className="h-[1px]"
          ></div>
        </CardContent>
        <CardFooter>
          <p>Not analyzed</p>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="transition-shadow duration-200 ease-in-out hover:shadow-lg dark:hover:shadow-primary/20">
      <CardHeader>
        <CardTitle>{entry.analysis.subject}</CardTitle>
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
        <p className="mb-2">
          {entry.analysis.summary.length > 30
            ? entry.analysis.summary.slice(0, 27) + '...'
            : entry.analysis.summary}
        </p>
        <p>
          <span className="">Sentiment score: </span>
          <span>{entry.analysis.sentimentScore}</span>
        </p>
        <div
          style={{
            backgroundColor: entry.analysis.color,
          }}
          className="h-[1px]"
        ></div>
      </CardContent>
      <CardFooter>
        <p>
          <span className="text-muted-foreground">Mood: </span>{' '}
          {entry.analysis.mood.length > 20
            ? entry.analysis.mood.slice(0, 17) + '...'
            : entry.analysis.mood}
        </p>
      </CardFooter>
    </Card>
  )
}
