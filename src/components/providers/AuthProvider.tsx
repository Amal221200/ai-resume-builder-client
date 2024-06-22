"use client"

import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { useTheme } from "next-themes"
import { ReactNode } from "react"

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { theme, systemTheme } = useTheme()
    return (
        <ClerkProvider appearance={(theme === 'dark' || (theme === 'system' && systemTheme === 'dark')) ? { baseTheme: dark } : {}}>
            {children}
        </ClerkProvider>
    )
}

export default AuthProvider