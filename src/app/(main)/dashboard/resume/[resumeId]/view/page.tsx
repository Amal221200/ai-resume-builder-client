import React from 'react'
import EditResumeProvider from '../_components/providers/EditResumeProvider'
import PreviewSection from '../edit/_components/PreviewSection'
import PreviewButtons from '../_components/PreviewButtons'
import { Metadata } from 'next'
import { getResume } from '@/lib/actions/resume-sanity'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const generateMetadata = async ({ params: { resumeId } }: { params: { resumeId: string } }): Promise<Metadata> => {
    const resume = await getResume(resumeId)

    return {
        title: `${resume?.firstName} ${resume?.lastName}'s Resume`,
        description: `Check out ${resume?.firstName} ${resume?.lastName}'s resumse, download and share.`
    }
}

const ViewResumePage = async ({ params: { resumeId } }: { params: { resumeId: string } }) => {
    const resume = await getResume(resumeId)

    if (!resume) {
        return null
    }
    
    return (
        <EditResumeProvider resume={resume}>
            <div className='mx-auto max-w-2xl p-3' id='print'>
                {resume.user_email === 'johndoe@example.com' ? (
                    <Button asChild variant="outline" className='mb-3 border border-primary-btn text-primary-btn'>
                        <Link href={`/dashboard/resume/${resume._id}/edit`}>
                            Go to Edit
                        </Link>
                    </Button>
                ) : <PreviewButtons />}
                <PreviewSection />
            </div>
        </EditResumeProvider>
    )
}

export default ViewResumePage