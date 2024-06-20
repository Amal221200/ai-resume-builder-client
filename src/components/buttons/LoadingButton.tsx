import React, { ComponentProps } from 'react'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoadingButtonProps extends ComponentProps<'button'> {
    loading: boolean
}

const LoadingButton = ({ className, children, loading, ...props }: LoadingButtonProps) => {
    return (
        <Button disabled={loading} variant="btn" {...props} className={cn('', className)}>
            {loading ? <Loader2 className='animate-spin' /> : children}
        </Button>
    )
}

export default LoadingButton