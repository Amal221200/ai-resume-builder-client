import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

const SectionLoading = ({ marginTop, borderTop }: { marginTop?: boolean , borderTop?: boolean}) => {
    return (
        <Skeleton className={cn('h-[85vh] w-full', marginTop && 'mt-10 h-[75vh]', borderTop&& 'border-t-4 border-t-primary-btn rounded-lg')} />
    )
}

export default SectionLoading