"use client"
import { Separator } from '@/components/ui/separator'
import { use } from 'react';
import { EditResumeContext, TEditResumeContext } from '../../../_components/providers/EditResumeProvider';
import Link from 'next/link';

const CertificatesPreview = ({ }: {}) => {
  const { resumeInfo } = use(EditResumeContext) as TEditResumeContext;

  return (
    <div className="my-3">
      <h3 className="mb-1 text-center text-sm font-bold" style={{
        color: "#222"
      }}>Certificates</h3>

      <Separator className='h-[1.5px]' style={{ backgroundColor: "#222" }} />
      {
        resumeInfo.certificates.map((certificate, index) => (
          <div key={index} className='my-3'>
            <div className='flex items-center gap-2'>
              <h6 style={{ color: "#222" }} className='text-sm font-bold'>{certificate.title}</h6>
              {
                certificate.link && <Link href={certificate.link} target='_blank' className='text-xs font-medium text-blue-700'>Link</Link>
              }
            </div>
              <p className='text-xs'>
                {certificate.provider}
              </p>
            {certificate.description &&
              <p className='my-2 text-sm'>
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