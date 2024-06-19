import { getResume } from '@/lib/actions/resume'
import React from 'react'

const EditResumePage = async ({ params: { resumeId } }: { params: { resumeId: string } }) => {
    const resume = await getResume(resumeId);
    
    if(!resume){
        return
    }

    return (
        <div>
            {resume.attributes.title}
        </div>
    )
}

export default EditResumePage