import React, { ComponentProps } from 'react'
import { Button } from '../ui/button'
import { SparkleIcon } from 'lucide-react'
import { cn } from '@/lib/utils'


const AIButton = ({ className, children, ...props }: ComponentProps<'button'>) => {
    return (
        <Button type="button" variant="outline" size="sm" {...props} className={cn('flex gap-2 border-primary-btn text-primary-btn',className)}>
            <SparkleIcon className='h-4 w-4' /> {children}
        </Button>
    )
}

export default AIButton