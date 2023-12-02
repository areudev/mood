import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {Button} from './ui/button'
import Link from 'next/link'

import {HamburgerMenuIcon} from '@radix-ui/react-icons'

export function HeaderSheet() {
  return (
    <Sheet>
      <SheetTrigger className="pt-1 md:hidden">
        <HamburgerMenuIcon height={24} width={24} />
      </SheetTrigger>
      <SheetContent side={'top'}>
        <SheetHeader>
          <div className="container flex items-center justify-center">
            <SheetClose asChild>
              <Button
                asChild
                className="text-md p-1 md:hidden"
                variant={'link'}
              >
                <Link href="/journal">Journal</Link>
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button
                className="text-md p-1 md:hidden"
                asChild
                variant={'link'}
              >
                <Link href="/history">Chart</Link>
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button
                className="text-md p-1 md:hidden"
                asChild
                variant={'link'}
              >
                <Link href="/ask">Ask</Link>
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
