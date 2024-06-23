"use client"
import { Separator } from '@/components/ui/separator'
import { use, useCallback } from 'react';
import { EditResumeContext, TEditResumeContext } from '../../../_components/providers/EditResumeProvider';
import { formatDate } from '@/lib/utils';
import { TEducation } from '@/lib/types';

const EducationPreview = ({ }: {}) => {
  const { resumeInfo } = use(EditResumeContext) as TEditResumeContext;
  const validStartDate = useCallback((education: TEducation) => education.startDate && formatDate(new Date(education.startDate)), [])
  const validEndDate = useCallback((education: TEducation) => education.endDate && formatDate(new Date(education.endDate)), [])
  
  return (
    <div className="my-3">
      <h3 className="mb-1 text-center text-sm font-bold" style={{
        color: "#222"
      }}>Education</h3>

      <Separator className='h-[1.5px]' style={{ backgroundColor: "#222" }} />

      {
        resumeInfo.educations.map((education, index) => (
          <div key={index} className='my-3'>
            <h6 style={{ color: "#222" }} className='text-sm font-bold'>{education.universityName}</h6>
            <p className='flex justify-between text-sm'>
              {education.degree} {(education.degree && education.major) && "in"} {education.major}
              <span>{validStartDate(education)} {(education?.currentlyStudying || education?.endDate) && "-"} {education?.currentlyStudying ? "Present" : validEndDate(education)}</span>
            </p>
            <p className='my-2 text-sm'>
              {education.description}
            </p>
          </div>
        ))
      }
    </div>
  )
}

export default EducationPreview