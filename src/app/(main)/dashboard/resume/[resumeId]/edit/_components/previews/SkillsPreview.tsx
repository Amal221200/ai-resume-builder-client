"use client"
import { Separator } from '@/components/ui/separator'
import { use } from 'react';
import { EditResumeContext, TEditResumeContext } from '../../../_components/providers/EditResumeProvider';

const SkillsPreview = ({ }: {}) => {
  const { resumeInfo } = use(EditResumeContext) as TEditResumeContext;

  return (
    <div className="my-3">
      <h3 className="mb-2 text-center text-sm font-bold" style={{
        color: resumeInfo.attributes.themeColor
      }}>Skills</h3>

      <Separator className='h-[1.5px]' style={{ backgroundColor: resumeInfo.attributes.themeColor }} />
      <div className='my-3 w-full'>
        <ul className='grid w-full list-inside list-disc grid-cols-[repeat(5,120px)] justify-center gap-y-2 text-left'>
          {
            resumeInfo.attributes?.skills?.map((skill, index) => (<li key={index} className='mx-2 text-[11px]'> {skill.name}</li>))
          }
        </ul>
      </div>
    </div>
  )
}

export default SkillsPreview