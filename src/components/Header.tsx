import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import ThemeSwither from './ThemeSwither'
import Link from 'next/link'
import { auth } from '@clerk/nextjs/server'
import dynamic from 'next/dynamic'
import { Skeleton } from './ui/skeleton'

const ThemedUserButton = dynamic(() => import('./ThemedUserButton'), { ssr: false, loading: () => <Skeleton className='h-8 w-8 rounded-full' /> })

const Header = () => {
    const { userId } = auth()
    return (
        <header id='no-print' className='flex items-center justify-between p-3 px-5 shadow-md'>
            <Link href="/dashboard">
                <Image src="/logo.svg" alt='logo' width={40} height={40} />
            </Link>

            <div className='flex items-center gap-x-2'>
                {
                    userId ? (
                        <>
                            <Button asChild variant="outline">
                                <Link href="/dashboard">Dashboard</Link>
                            </Button>

                            <ThemedUserButton />
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