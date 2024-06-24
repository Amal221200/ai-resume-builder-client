"use client"
import { Separator } from '@/components/ui/separator'
import { use } from 'react';
import { EditResumeContext, TEditResumeContext } from '../../../_components/providers/EditResumeProvider';
import Link from 'next/link';

const CertificatesPreview = ({ }: {}) => {
  const { resumeInfo } = use(EditResumeContext) as TEditResumeContext;

  return (
    <div className="my-3">
      <h3 className="mb-1 text-center text-[9px] font-bold sm:text-sm">Certificates</h3>

      <Separator className='h-[1.5px]' />
      {
        resumeInfo.certificates.map((certificate, index) => (
          <div key={index} className='my-3'>
            <div className='flex items-center gap-2'>
              <h6 className='text-[9px] font-bold sm:text-sm'>{certificate.title}</h6>
              {
                certificate.link && <Link href={certificate.link} target='_blank' className='text-[7px] font-medium text-blue-700 sm:text-xs'>Link</Link>
              }
            </div>
              <p className='text-[7px] sm:text-xs'>
                {certificate.provider}
              </p>
            {certificate.description &&
              <p className='my-2 text-[9px] sm:text-sm'>
                {certificate.description}
              </p>
            }
          </div>
        ))
      }
    </div>
  )
}

export default CertificatesPreview