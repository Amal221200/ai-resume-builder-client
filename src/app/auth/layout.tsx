import { Skeleton } from "@/components/ui/skeleton"
import { ReactNode, Suspense } from "react"


function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <section className="grid min-h-screen w-full place-content-center">
            <main className="flex flex-col items-center">
                <Suspense fallback={<Skeleton className="max-h-56 max-w-56 rounded-lg p-3" />}>
                    {children}
                </Suspense>
            </main>
        </section>
    )
}

export default AuthLayout