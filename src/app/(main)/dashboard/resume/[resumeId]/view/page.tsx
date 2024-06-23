import React from 'react'
import EditResumeProvider from '../_components/providers/EditResumeProvider'
import PreviewSection from '../edit/_components/PreviewSection'
import PreviewButtons from '../_components/PreviewButtons'
import { Metadata } from 'next'
import { getResume } from '@/lib/actions/resume-sanity'

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
                <PreviewButtons />
                <PreviewSection />
            </div>
        </EditResumeProvider>
    )
}

export default ViewResumePage