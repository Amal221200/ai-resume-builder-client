import { getResume } from '@/lib/actions/resume'
import React from 'react'
import EditResumeProvider from '../edit/_components/providers/EditResumeProvider'
import PreviewSection from '../edit/_components/PreviewSection'
import PreviewButtons from '../_components/PreviewButtons'


const ViewResumePage = async ({ params: { resumeId } }: { params: { resumeId: string } }) => {
    const resume = await getResume(resumeId)

    if (!resume) {
        return
    }
    return (
        <EditResumeProvider resume={resume}>
            <div className='mx-auto mb-3 max-w-2xl' id='print'>
                <PreviewButtons />
                <PreviewSection />
            </div>
        </EditResumeProvider>
    )
}

export default ViewResumePage