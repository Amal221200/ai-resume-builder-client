"use client"
import { Separator } from '@/components/ui/separator'
import { use } from 'react';
import { EditResumeContext, TEditResumeContext } from '../../../_components/providers/EditResumeProvider';

const SkillsPreview = ({ }: {}) => {
  const { resumeInfo } = use(EditResumeContext) as TEditResumeContext;

  return (
    <div className="my-3">
      <h3 className="mb-2 text-center text-[9px] font-bold sm:text-sm" style={{
        color: "#222"
      }}>Skills</h3>

      <Separator className='h-[1.5px]' style={{ backgroundColor: "#222" }} />
      <div className='my-3 w-full'>
        <ul className='grid w-full list-inside list-disc grid-cols-6 justify-center gap-y-2 text-left sm:grid-cols-[repeat(5,120px)]'>
          {
            resumeInfo?.skills?.map((skill, index) => (<li key={index} className='mx-2 text-[8px] sm:text-[11px]'> {skill.name}</li>))
          }
        </ul>
      </div>
    </div>
  )
}

export default SkillsPreview