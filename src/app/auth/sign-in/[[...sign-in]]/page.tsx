"use client"
import { SignIn } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { useTheme } from 'next-themes'
import React from 'react'

const SignInPage = () => {
    const { theme, systemTheme } = useTheme()
    return <SignIn appearance={(theme === 'dark' || (theme === 'system' && systemTheme === 'dark')) ? { baseTheme: dark } : {}} />
}

export default SignInPage