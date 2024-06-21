"use client"
import { Separator } from '@/components/ui/separator'
import { use } from 'react';
import { EditResumeContext, TEditResumeContext } from '../providers/EditResumeProvider';

const ExperiencePreview = ({ }: {}) => {
  const { resumeInfo } = use(EditResumeContext) as TEditResumeContext;

  return (
    <div className="my-6">
      <h3 className="mb-2 text-center text-sm font-bold" style={{
        color: resumeInfo.attributes?.themeColor
      }}>Professional Experience</h3>

      <Separator className='h-[1.5px]' style={{ backgroundColor: resumeInfo.attributes?.themeColor }} />

      {
        resumeInfo.attributes.experiences.map((experience, index) => (
          <div key={index} className='my-5'>
            <h6 style={{ color: resumeInfo.attributes?.themeColor }} className='text-sm font-bold'>{experience.title}</h6>
            <p className='flex justify-between text-sm'>
              {experience.companyName}{(experience.companyName && experience.city) && `,`} {experience.city}{experience.city && experience.state && `,`} {experience.state}
              <span>
                {experience.startDate} {((experience.currentlyWorking) || experience.endDate) && "-"} {experience.currentlyWorking ? "Present" : experience.endDate}
              </span>
            </p>
            
            <div className='experience-work-summary my-2 text-sm' dangerouslySetInnerHTML={{ __html: experience.workSummary }} />
          </div>
        ))
      }
    </div>
  )
}

export default ExperiencePreview