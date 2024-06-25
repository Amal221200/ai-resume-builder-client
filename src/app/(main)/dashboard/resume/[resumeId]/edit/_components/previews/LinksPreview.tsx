"use client"
import { use } from 'react';
import { EditResumeContext, TEditResumeContext } from '../../../_components/providers/EditResumeProvider';

const LinksPreview = ({ }: {}) => {
  const { resumeInfo } = use(EditResumeContext) as TEditResumeContext;

  return (
    <div className="">
      <div className='mx-auto w-[350px]'>
        <div className='flex w-full flex-wrap items-center justify-center gap-x-1 text-left'>
          {
            resumeInfo?.links?.map((link, index) => (
              <a key={index} href={link.url || "#"} target='_blank' className='text-[7px] font-medium sm:text-[9px]'>
                {link.label}
              </a>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default LinksPreview