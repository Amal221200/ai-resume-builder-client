"use client"
import { SignUp } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { useTheme } from 'next-themes'

const SignUpPage = () => {
    const { theme, systemTheme } = useTheme()
    return <SignUp appearance={(theme === 'dark' || (theme === 'system' && systemTheme === 'dark')) ? { baseTheme: dark } : {}} />
}

export default SignUpPage