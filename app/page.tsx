import {Button} from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
	return (
		<main className="container flex min-h-screen w-full items-center ">
			<div className="mx-auto flex w-[45rem] flex-col items-start gap-4">
				<h1 className="text-4xl font-semibold">The best Journal app, period</h1>
				<p className="text-xl">
					This is the best app for tracking your mood through out your life. All
					you have to do is be honest with yourself and you will be able to see
				</p>
				<Button asChild>
					<Link href="/journal">Get Started</Link>
				</Button>
			</div>
		</main>
	)
}
