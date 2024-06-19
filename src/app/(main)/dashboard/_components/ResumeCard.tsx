import { TResume } from '@/lib/types'
import { Notebook } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const ResumeCard = ({ resume }: { resume: TResume }) => {
    return (
        <Link href={`/dashboard/resume/${resume.attributes.resumeId}/edit`}>
            <div className='flex h-[280px] items-center justify-center rounded-lg border border-primary-btn bg-secondary p-14 shadow-primary-btn transition-all hover:scale-105 hover:shadow-md'>
                <Notebook />
            </div>
            <h3 className='my-1 text-center'>{resume.attributes.title}</h3>
        </Link>
    )
}

export default ResumeCard