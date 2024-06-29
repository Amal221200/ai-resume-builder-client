import { getResume } from '@/lib/actions/resume-sanity'
import React from 'react'
import EditResumeProvider from '../_components/providers/EditResumeProvider';
import dynamic from 'next/dynamic';
import SectionLoading from './_components/SectionLoading';
import { Metadata } from 'next';

const FormSection = dynamic(() => import('./_components/FormSection'), { ssr: false, loading: () => <SectionLoading /> });
const PreviewSection = dynamic(() => import('./_components/PreviewSection'), { ssr: false, loading: () => <SectionLoading /> });

export const generateMetadata = async ({ params: { resumeId } }: { params: { resumeId: string } }): Promise<Metadata> => {
    const resume = await getResume(resumeId)

    return {
        title: `${resume?.username} Edit Resume`,
        description: `${resume?.username}'s edit resume section`
    }
}

const EditResumePage = async ({ params: { resumeId } }: { params: { resumeId: string } }) => {
    const resume = await getResume(resumeId);

    if (!resume) {
        return null
    }

    return (
        <EditResumeProvider resume={resume}>
            <div className='grid grid-cols-1 gap-10 p-3 sm:p-10 lg:grid-cols-2'>
                <FormSection />
                <PreviewSection className="hidden lg:block" scrollable />
            </div>
        </EditResumeProvider>
    )
}

export default EditResumePage