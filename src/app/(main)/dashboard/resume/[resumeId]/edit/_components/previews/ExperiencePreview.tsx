"use client"
import { Separator } from '@/components/ui/separator'
import { use, useCallback } from 'react';
import { EditResumeContext, TEditResumeContext } from '../../../_components/providers/EditResumeProvider';
import { TExperience } from '@/lib/types';
import { formatDate } from '@/lib/utils';

const ExperiencePreview = ({ }: {}) => {
  const { resumeInfo } = use(EditResumeContext) as TEditResumeContext;

  const validStartDate = useCallback((experience: TExperience) => experience.startDate && formatDate(new Date(experience.startDate)), [])
  const validEndDate = useCallback((experience: TExperience) => experience.endDate && formatDate(new Date(experience.endDate)), [])
  return (
    <div className="my-3">
      <h3 className="mb-1 text-center text-[9px] font-bold sm:text-sm">Professional Experience</h3>

      <Separator className='h-[1.5px]' />

      {
        resumeInfo.experiences.map((experience, index) => (
          <div key={index} className='my-3'>
            <h6 className='text-[9px] font-bold sm:text-sm'>{experience.title}</h6>
            <p className='flex justify-between text-[9px] sm:text-sm'>
              {experience.companyName}{(experience.companyName && experience.city) && `,`} {experience.city}{experience.city && experience.state && `,`} {experience.state}
              <span>
                {validStartDate(experience)} {((experience.currentlyWorking) || experience.endDate) && "-"} {experience.currentlyWorking ? "Present" : validEndDate(experience)}
              </span>
            </p>
            
            <div className='experience-work-summary my-2 text-[9px] sm:text-sm' dangerouslySetInnerHTML={{ __html: experience.workSummary }} />
          </div>
        ))
      }
    </div>
  )
}

export default ExperiencePreview