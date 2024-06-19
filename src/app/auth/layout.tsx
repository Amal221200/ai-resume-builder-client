import { ReactNode, Suspense } from "react"


function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <section className="grid min-h-screen w-full place-content-center">
            <main className="flex flex-col items-center">
                <Suspense fallback={""}>
                    {children}
                </Suspense>
                <h1 className="my-3 text-center font-medium italic">Feel free to use any credentials you&apos;d like. We prioritize your privacy and won&apos;t misuse your information. <br />
                    It&apos;s just a side project to show potential employers and recruters to show my skills.</h1>
            </main>
        </section>
    )
}

export default AuthLayout