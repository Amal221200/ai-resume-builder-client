"use client"
import { Separator } from '@/components/ui/separator'
import { use } from 'react';
import { EditReviewContext, TEditorReviewContext } from '../providers/EditReviewProvider';

const EducationPreview = ({  }: {  }) => {
  const { resumeInfo } = use(EditReviewContext) as TEditorReviewContext;

  return (
    <div className="my-6">
      <h3 className="mb-2 text-center text-sm font-bold" style={{
        color: resumeInfo.attributes?.themeColor
      }}>Education</h3>

      <Separator className='h-[1.5px]' style={{ backgroundColor: resumeInfo.attributes?.themeColor }} />

      {
        resumeInfo.attributes?.education?.map((education, index) => (
          <div key={index} className='my-5'>
            <h6 style={{ color: resumeInfo.attributes?.themeColor }} className='text-sm font-bold'>{education.universityName}</h6>
            <p className='flex justify-between text-sm'>
              {education.degree} in {education.major}
              <span >{education.startDate} - {education?.currentlyStudying ? "Present" : education.endDate}</span>
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