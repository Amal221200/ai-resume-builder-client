"use client"

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useCallback } from 'react'
import { RWebShare } from "react-web-share"

const PreviewButtons = () => {
  const { resumeId } = useParams()
  const handleDownload = useCallback(() => {
    window.print()
  }, [])

  return (
    <div className='my-3 flex justify-between' id='no-print'>
      <div className='space-x-2'>
        <Button type='button' variant="btn" onClick={handleDownload}>
          Download
        </Button>
        <Button asChild variant="outline" className='border border-primary-btn text-primary-btn'>
          <Link href={`/dashboard/resume/${resumeId}/edit`}>
            Go to Edit
          </Link>
        </Button>
      </div>

      <RWebShare
        data={{
          text: "AI Resume builder, open the url to see the resume",
          url: `/dashboard/resume/${resumeId}/view`,
          title: "Share your resume"
        }}
        disableNative={true}

      >
        <Button type='button' variant="btn">Share</Button>
      </RWebShare>
    </div>

  )
}

export default PreviewButtons