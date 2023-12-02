import './globals.css'
import {
  Work_Sans as FontSans,
  Playfair_Display as FontSerif,
} from 'next/font/google'
import {ClerkProvider} from '@clerk/nextjs'
import {cn} from '@/lib/utils'

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const fontSerif = FontSerif({
  subsets: ['latin'],
  variable: '--font-serif',
})

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            'min-h-screen bg-background font-sans antialiased',
            fontSans.variable,
            fontSerif.variable,
          )}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
