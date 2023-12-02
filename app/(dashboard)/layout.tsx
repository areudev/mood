import {Button} from '@/components/ui/button'
import {Toaster} from '@/components/ui/toaster'
import {UserButton} from '@clerk/nextjs'
import Link from 'next/link'

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="items flex h-screen w-full justify-center">
      {/* <aside className="h-full w-52 flex-grow border-r">Mood</aside> */}
      <div className="w-full">
        <header className="border-b py-4">
          <div className="container flex items-center justify-between">
            <h1 className="font-serif text-3xl font-semibold">
              <Link href="/">Mood</Link>
            </h1>
            <div className="flex items-center justify-center gap-2">
              <Button asChild className="p-1 text-lg" variant={'link'}>
                <Link href="/journal">Journal</Link>
              </Button>
              <Button className="p-1 text-lg" asChild variant={'link'}>
                <Link href="/history">Chart</Link>
              </Button>
              <Button className="mr-2 p-1 text-lg" asChild variant={'link'}>
                <Link href="/ask">Ask</Link>
              </Button>
              <UserButton />
            </div>
          </div>
        </header>
        <main className="container py-6">{children}</main>
      </div>
      <Toaster />
    </div>
  )
}
