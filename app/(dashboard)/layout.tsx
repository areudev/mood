import {UserButton} from '@clerk/nextjs'

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
            <h1 className="font-serif text-3xl font-semibold">Mood</h1>
            <UserButton />
          </div>
        </header>
        <main className="container py-2">{children}</main>
      </div>
    </div>
  )
}
