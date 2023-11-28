import {Button} from '@/components/ui/button'
import Link from 'next/link'
import {auth} from '@clerk/nextjs'

export default async function Home() {
  const {userId} = auth()

  const href = userId ? '/journal' : '/new-user'

  return (
    <main className="container flex min-h-screen w-full items-center ">
      <div className="mx-auto flex w-[45rem] flex-col items-start gap-4">
        <h1 className="font-serif text-3xl font-semibold">
          The best Journal app, period
        </h1>
        <p className="text-lg">
          This is the best app for tracking your mood through out your life. All
          you have to do is be honest with yourself and you will be able to see
        </p>
        <Button asChild>
          <Link href={href}>Get Started</Link>
        </Button>
      </div>
    </main>
  )
}
