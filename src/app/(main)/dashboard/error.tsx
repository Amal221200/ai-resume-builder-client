"use client"
import { ServerCrash } from 'lucide-react'

const ErrorPage = ({ error }: { error: any }) => {
  
    return (
        <main className="grid h-[85vh] place-content-center gap-y-2 p-3">
            <h1 className='flex items-center justify-center gap-x-2 text-xl font-medium text-red-800 md:text-3xl'>
                <ServerCrash /> Sorry for the inconvenience
            </h1>
            <p className='text-base md:text-xl'>My server needs some time to spin up, since it goes down when it is not used for a long time. Please wait for a minute or two and refresh the website</p>
        </main>
    )
}

export default ErrorPage