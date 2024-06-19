"use client"
import { Separator } from '@/components/ui/separator'
import { use } from 'react';
import { EditReviewContext, TEditorReviewContext } from '../providers/EditReviewProvider';

const ExperiencePreview = ({  }: { }) => {
  const { resumeInfo } = use(EditReviewContext) as TEditorReviewContext;

  return (
    <div className="my-6">
      <h3 className="mb-2 text-center text-sm font-bold" style={{
        color: resumeInfo.attributes?.themeColor
      }}>Professional Experience</h3>

      <Separator className='h-[1.5px]' style={{ backgroundColor: resumeInfo.attributes?.themeColor }} />

      {
        resumeInfo.attributes?.experience?.map((experience, index) => (
          <div key={index} className='my-5'>
            <h6 style={{ color: resumeInfo.attributes?.themeColor }} className='text-sm font-bold'>{experience.title}</h6>
            <p className='flex justify-between text-sm'>
              {experience.companyName}, {experience.city}, {experience.state}
              <span>
                {experience.startDate} - {experience.currentlyWorking ? "Present" : experience.endDate}
              </span>
            </p>
            <p className='my-2 text-sm'>
              {experience.workSummary}
            </p>
          </div>
        ))
      }
    </div>
  )
}

export default ExperiencePreview