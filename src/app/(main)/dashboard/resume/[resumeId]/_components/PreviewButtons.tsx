"use client"

import { Button } from '@/components/ui/button'
import React, { useCallback } from 'react'

const PreviewButtons = () => {
  const handleDownload = useCallback(() => {
    window.print()
  }, [])
  
  return (
    <div className='my-3 flex justify-between' id='no-print'>
      <Button type='button' variant="btn" onClick={handleDownload}>
        Download
      </Button>
      <Button type='button' variant="btn">
        Share
      </Button>
    </div>
  )
}

export default PreviewButtons