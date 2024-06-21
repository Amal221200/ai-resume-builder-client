import { ReactNode } from "react"


function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <main className="flex h-screen w-full items-center justify-center">
            {children}
        </main>
    )
}

export default AuthLayout