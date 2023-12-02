import {HeaderSheet} from '@/components/header-sheet'
import {ModeToggle} from '@/components/mode-toggle'
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
      <div className="w-full">
        <header className="border-b py-4">
          <div className="container flex items-center justify-between ">
            <div className="-mt-1 flex gap-3">
              <HeaderSheet />
              <h1 className="font-serif text-3xl font-semibold md:block">
                <Link href="/">Mood</Link>
              </h1>
            </div>

            <div className="flex items-center justify-center gap-2">
              <Button
                asChild
                className="hidden p-1 text-lg md:block"
                variant={'link'}
              >
                <Link href="/journal">Journal</Link>
              </Button>
              <Button
                className="hidden p-1 text-lg md:block"
                asChild
                variant={'link'}
              >
                <Link href="/history">Chart</Link>
              </Button>
              <Button
                className="hidden p-1 text-lg md:block"
                asChild
                variant={'link'}
              >
                <Link href="/ask">Ask</Link>
              </Button>
              <ModeToggle />
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
