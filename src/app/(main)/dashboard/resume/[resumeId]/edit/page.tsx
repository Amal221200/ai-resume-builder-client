
import { getResume } from '@/lib/actions/resume'
import React from 'react'
import EditResumeProvider from './_components/providers/EditResumeProvider';
import dynamic from 'next/dynamic';
import SectionLoading from './_components/SectionLoading';

const FormSection = dynamic(() => import('./_components/FormSection'), { ssr: false, loading: () => <SectionLoading /> });
const PreviewSection = dynamic(() => import('./_components/PreviewSection'), { ssr: false, loading: () => <SectionLoading /> });

const EditResumePage = async ({ params: { resumeId } }: { params: { resumeId: string } }) => {
    const resume = await getResume(resumeId);

    if (!resume) {
        return
    }

    return (
        <EditResumeProvider resume={resume}>
            <div className='grid grid-cols-1 gap-10 p-3 sm:p-10 lg:grid-cols-2'>
                <FormSection />
                <PreviewSection className="hidden lg:block" />
            </div>
        </EditResumeProvider>
    )
}

export default EditResumePage