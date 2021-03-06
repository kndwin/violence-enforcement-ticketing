import { signIn, signOut, useSession } from 'next-auth/client'
import Link from 'next/link'

import styles from './Layout.module.scss'
import { Button } from 'components'

export default function Layout ({
	children,
	isSignIn
} : {
	children: React.ReactNode
	isSignIn?: boolean
}) { 

  const [ session ] = useSession()

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				{!isSignIn && !session &&
					<header className={styles.header}>
						<p className={styles.logoText}>
							OrionNT
						</p>
						<Button onClick={() => signIn()}>
							Sign in
						</Button>
					</header>
				}
				{!isSignIn && session &&
					<header className={styles.header}>
						<div className={styles.leftSide}>
							<Link href="/">
								<a>Dashboard</a>
							</Link>
							<Link href="/cases">
								<a>Cases</a>
							</Link>
						</div>
						<div className={styles.rightSide}>
							<img className={styles.icon}
								src={session.user.image} 
								alt="Profile image" 
							/>
							<div>
							<Button onClick={() => signOut()}>
								Sign out
							</Button>
							</div>
						</div>
					</header>
				}
				{isSignIn &&
					<header className={styles.header}>
						<p className={styles.logoText}>
							OrionNT
						</p>
					</header>
				}
				<main className={styles.main}>
					{children}
				</main>
			</div>
		</div>
	)
}
