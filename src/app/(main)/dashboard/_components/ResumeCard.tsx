import { MoreVertical } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ResumeCardDropdownMenu from './ResumeCardDropdownMenu'
import { TResume } from '@/lib/types-sanity'

const ResumeCard = ({ resume }: { resume: TResume }) => {
    
    return (
        <div className='transition-all hover:scale-105'>
            <Link href={`/dashboard/resume/${resume._id}/edit`} >
                <div className='flex h-[280px] items-center justify-center rounded-t-lg bg-secondary bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 p-14 shadow-primary-btn transition-all hover:shadow-md'>
                    <Image src="/cv.png" alt='cv' width={50} height={55} />
                </div>
            </Link>
            <div className='flex justify-between rounded-b-lg border bg-[#222] p-3 text-neutral-300'>
                <h3 className='my-1 text-center'>{resume.title}</h3>
                <ResumeCardDropdownMenu resumeId={resume._id}>
                    <MoreVertical className='cursor-pointer' />
                </ResumeCardDropdownMenu>
            </div>
        </div>
    )
}

export default ResumeCard