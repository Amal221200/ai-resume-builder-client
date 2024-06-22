"use client"
import { Separator } from '@/components/ui/separator'
import { use } from 'react';
import { EditResumeContext, TEditResumeContext } from '../../../_components/providers/EditResumeProvider';
import Link from 'next/link';

const ProjectsPreview = ({ }: {}) => {
  const { resumeInfo } = use(EditResumeContext) as TEditResumeContext;

  return (
    <div className="my-3">
      <h3 className="mb-1 text-center text-sm font-bold" style={{
        color: resumeInfo.attributes?.themeColor
      }}>Projects</h3>

      <Separator className='h-[1.5px]' style={{ backgroundColor: resumeInfo.attributes?.themeColor }} />

      {
        resumeInfo.attributes.projects.map((project, index) => (
          <div key={index} className='my-3'>
            <div className='flex items-center gap-2'>
              <h6 style={{ color: resumeInfo.attributes?.themeColor }} className='text-sm font-bold'>{project.title}</h6>
              {
               project.link && <Link href={project.link} target='_blank' className='text-xs font-medium text-blue-700'>Link</Link>
              }
            </div>
            <small className='text-[11px]'>{project.stack}</small>

            <div className='experience-work-summary my-2 text-sm' dangerouslySetInnerHTML={{ __html: project.description }} />
          </div>
        ))
      }
    </div>
  )
}

export default ProjectsPreview