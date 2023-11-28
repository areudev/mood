import {auth, currentUser} from '@clerk/nextjs'
import {prisma} from '@/lib/db'
import {redirect} from 'next/navigation'

const createNewUser = async () => {
	const user = await currentUser()
	// console.log(user)

	if (!user) {
		throw new Error('No user id')
	}
	const match = await prisma.user.findUnique({
		where: {
			clerkId: user.id,
		},
	})

	if (!match) {
		await prisma.user.create({
			data: {
				clerkId: user.id,
				email: user.emailAddresses[0].emailAddress,
			},
		})
	}

	redirect('/journal')
}

export default async function NewUserPage() {
	await createNewUser()
	return <div>creating user yo...</div>
}
