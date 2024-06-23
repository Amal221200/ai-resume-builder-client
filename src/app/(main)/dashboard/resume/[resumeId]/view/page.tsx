import { getResume } from '@/lib/actions/resume'
import React from 'react'
import EditResumeProvider from '../_components/providers/EditResumeProvider'
import PreviewSection from '../edit/_components/PreviewSection'
import PreviewButtons from '../_components/PreviewButtons'
import { Metadata } from 'next'

export const generateMetadata = async ({ params: { resumeId } }: { params: { resumeId: string } }): Promise<Metadata> => {
    const resume = await getResume(resumeId)

    return {
        title: `${resume?.attributes.firstName} ${resume?.attributes.lastName}'s Resume`,
        description: `Check out ${resume?.attributes.firstName} ${resume?.attributes.lastName}'s resumse, download and share.`
    }
}

const ViewResumePage = async ({ params: { resumeId } }: { params: { resumeId: string } }) => {
    const resume = await getResume(resumeId)

    if (!resume) {
        throw new Error("504")
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