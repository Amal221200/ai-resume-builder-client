import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const CardLoading = () => {
    return (
        <Skeleton className='h-[280px] rounded-lg bg-secondary p-14 py-24' />
    )
}

export default CardLoading