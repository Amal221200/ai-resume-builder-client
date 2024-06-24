"use client"
import { Separator } from '@/components/ui/separator'
import { use } from 'react';
import { EditResumeContext, TEditResumeContext } from '../../../_components/providers/EditResumeProvider';
import Link from 'next/link';

const ProjectsPreview = ({ }: {}) => {
  const { resumeInfo } = use(EditResumeContext) as TEditResumeContext;

  return (
    <div className="my-3">
      <h3 className="mb-1 text-center text-[9px] font-bold sm:text-sm" style={{
        color: "#222"
      }}>Projects</h3>

      <Separator className='h-[1.5px]' style={{ backgroundColor: "#222" }} />

      {
        resumeInfo.projects.map((project, index) => (
          <div key={index} className='my-1 sm:my-3'>
            <div className='flex items-center gap-x-1 sm:gap-x-2'>
              <h6 style={{ color: "#222" }} className='text-[9px] font-bold sm:text-sm'>{project.title}</h6>
              {
               project.link && <Link href={project.link} target='_blank' className='text-[7px] font-medium text-blue-700 sm:text-xs'>Link</Link>
              }
            </div>
            <p className='text-[8px] sm:text-[11px]'>{project.stack}</p>
            <div className='experience-work-summary my-1 text-[9px] sm:my-2 sm:text-sm' dangerouslySetInnerHTML={{ __html: project.description }} />
          </div>
        ))
      }
    </div>
  )
}

export default ProjectsPreview