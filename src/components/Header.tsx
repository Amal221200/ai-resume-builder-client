import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import ThemeSwither from './ThemeSwither'
import Link from 'next/link'
import { auth } from '@clerk/nextjs/server'
import { UserButton } from '@clerk/nextjs'

const Header = () => {
    const { userId } = auth()
    return (
        <header className='flex items-center justify-between p-3 px-5 shadow-md'>
            <Image src="/logo.svg" alt='logo' width={40} height={40} />

            <div className='flex items-center gap-x-2'>
                {
                    userId ? (
                        <>
                            <Button asChild variant="outline">
                                <Link href="/dashboard">Dashboard</Link>
                            </Button>
                            <UserButton />
                        </>
                    ) : (

                        <Button variant="btn" asChild>
                            <Link href="/auth/sign-in">Get Started</Link>
                        </Button>
                    )
                }
                <ThemeSwither />
            </div>
        </header>
    )
}

export default Header