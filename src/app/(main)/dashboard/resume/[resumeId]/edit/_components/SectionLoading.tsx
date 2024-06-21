import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

const SectionLoading = ({marginTop}:{marginTop?: boolean}) => {
    return (
        <Skeleton className={cn('h-[85vh] w-full', marginTop && 'mt-10 h-[75vh]') }/>
    )
}

export default SectionLoading