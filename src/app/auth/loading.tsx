import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const loading = () => {
    return (
        <main className="grid h-screen w-full place-content-center">
            <Skeleton className="m-10 min-h-60 min-w-60 rounded-lg sx:min-h-72 sx:min-w-72 xs:min-h-80 xs:min-w-80" />
        </main>
    )
}

export default loading