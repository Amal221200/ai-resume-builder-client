import { TResume } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ResumeCard = ({ resume }: { resume: TResume }) => {
    return (
        <Link href={`/dashboard/resume/${resume.id}/edit`}>
            <div className='flex h-[280px] items-center justify-center rounded-lg border border-primary-btn bg-secondary bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 p-14 shadow-primary-btn transition-all hover:scale-105 hover:shadow-md'>
                <Image src="/cv.png" alt='cv' width={50} height={55} />
            </div>
            <h3 className='my-1 text-center'>{resume.attributes.title}</h3>
        </Link>
    )
}

export default ResumeCard