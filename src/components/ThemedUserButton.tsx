"use client"
import { UserButton } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { useTheme } from 'next-themes'

const ThemedUserButton = () => {
    const { theme, systemTheme } = useTheme()
    return (
        <UserButton appearance={(theme === 'dark' || (theme === 'system' && systemTheme === 'dark')) ? { baseTheme: dark } : {}} />
    )
}

export default ThemedUserButton