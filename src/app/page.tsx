import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = auth()

  if (user.userId) {
    redirect("/dashboard")
  }

  return (
    <>
      <Header />
      <section className="z-50 flex min-h-[70vh] items-center justify-center">
        <div className="mx-auto max-w-screen-xl px-4 py-8 text-center lg:px-12 lg:py-16">
          <Link href="/auth/sign-in" className="mb-7 inline-flex items-center justify-between rounded-full bg-gray-100 px-1 py-1 pr-4 text-sm text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700" role="alert">
            <span className="mr-3 rounded-full bg-primary px-4 py-1.5 text-xs text-white dark:bg-gray-500">New</span> <span className="text-sm font-medium">AI Resume Builder</span>
            <ChevronRight size={18} className="ml-2" />
          </Link>
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            Build Your Resume <span className='text-primary'>With AI</span> </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 dark:text-gray-400 sm:px-16 lg:text-xl xl:px-48">Effortlessly Craft a Standout Resume with Our AI-Powered Builder</p>
          <div className="mb-8 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0 lg:mb-16">
            <Button variant={'btn'} asChild className="px-5 py-2">
              <Link href="/auth/sign-in" className="inline-flex items-center justify-center gap-2 text-center text-base font-medium">
                Get Started
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
