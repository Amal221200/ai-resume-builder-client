"use client"
import { Separator } from '@/components/ui/separator'
import { use } from 'react';
import { EditResumeContext, TEditResumeContext } from '../providers/EditResumeProvider';

const SkillsPreview = ({ }: {}) => {
  const { resumeInfo } = use(EditResumeContext) as TEditResumeContext;

  return (
    <div className="my-6">
      <h3 className="mb-2 text-center text-sm font-bold" style={{
        color: resumeInfo.attributes.themeColor
      }}>Skills</h3>

      <Separator className='h-[1.5px]' style={{ backgroundColor: resumeInfo.attributes.themeColor }} />
      <div className='my-4 grid grid-cols-2 gap-3'>
        {
          resumeInfo.attributes?.skills?.map((skill, index) => (
            <div key={index} className='flex items-center justify-between'>
              <h6 className='text-xs'>{skill.name}</h6>
              <div className='h-2 w-[120px] bg-gray-200' >
                <div className='h-2' style={{ backgroundColor: resumeInfo.attributes.themeColor, width: `${skill.rating * 20}%` }} />
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default SkillsPreview