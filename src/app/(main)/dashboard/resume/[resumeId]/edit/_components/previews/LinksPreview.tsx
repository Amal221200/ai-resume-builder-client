"use client"
import { use } from 'react';
import { EditResumeContext, TEditResumeContext } from '../../../_components/providers/EditResumeProvider';

const LinksPreview = () => {
  const { resumeInfo } = use(EditResumeContext) as TEditResumeContext;

  return (
    <div className="">
      <div className='mx-auto w-[350px]'>
        <div className='flex w-full flex-wrap items-center justify-center text-left'>
          {
            resumeInfo?.links?.map((link, index) => (
              <a key={index} href={link.url || "#"} target='_blank' className='group text-[7px] font-medium sm:text-[10px]'>
                {link.label}
                <span className="mx-[3px] inline group-last-of-type:hidden">•</span>
              </a>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default LinksPreview