"use client"
import React, { use, useCallback, useEffect, useState } from 'react'
import PersonalDetailForm from './forms/PersonalDetailForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, FullscreenIcon, LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';
import SummaryDetailForm from './forms/SummaryDetailForm';
import dynamic from 'next/dynamic';
import ExperienceDetailForm from './forms/ExperienceDetailForm';
import EducationDetailForm from './forms/EducationDetailForm';
import SkillsDetail from './forms/SkillsDetail';

const PreviewModal = dynamic(() => import('./modal/PreviewModal'), { ssr: false });

const FormSection = () => {
    const [activeForm, setActiveForm] = useState(parseInt(localStorage.getItem(`step`) ?? '1'))
    const [openPreviewModal, setOpenPreviewModal] = useState(false)
    const [enableNav, setEnableNav] = useState(true)

    const onNext = useCallback(() => {
        setActiveForm((current) => current + 1)
        localStorage.setItem(`step`, (activeForm + 1).toString())
    }, [activeForm])

    const onPrevious = useCallback(() => {
        setActiveForm((current) => current - 1)
        localStorage.setItem(`step`, (activeForm - 1).toString())
    }, [activeForm])

    useEffect(() => {
        return () => {
            localStorage.removeItem('step')
        }
    }, [])
    return (
        <div className='no-scrollbar h-[85vh] overflow-auto'>
            <div className='flex items-center justify-between'>
                <Button variant="outline" className='flex gap-2'>
                    <LayoutGrid /> Theme
                </Button>
                <div className='flex gap-x-3'>
                    <div className='flex gap-x-3'>
                        <Button onClick={onPrevious} size="sm"
                            className={cn(activeForm === 1 ? "hidden" : 'inline')} disabled={!enableNav}>
                            <ArrowLeft />
                        </Button>
                        <Button onClick={onNext}
                            className={cn('flex gap-2')} disabled={activeForm === 5 || !enableNav} size={'sm'}>
                            Next <ArrowRight />
                        </Button>
                    </div>
                    <Button onClick={() => setOpenPreviewModal(true)}
                        className={cn('flex gap-2 lg:hidden')} size={'sm'} variant={'secondary'}>
                        <FullscreenIcon /> Preview
                    </Button>
                </div>
            </div>
            {
                activeForm === 1 && <PersonalDetailForm enableNav={(val) => setEnableNav(val)} />
            }
            {
                activeForm === 2 && <SummaryDetailForm enableNav={(val) => setEnableNav(val)} />
            }
            {
                activeForm === 3 && <ExperienceDetailForm enableNav={(val) => setEnableNav(val)} />
            }
            {
                activeForm === 4 && <EducationDetailForm enableNav={(val) => setEnableNav(val)} />
            }
            {
                activeForm === 5 && <SkillsDetail enableNav={(val) => setEnableNav(val)} />
            }

            <PreviewModal open={openPreviewModal} onClose={() => setOpenPreviewModal(false)} />
        </div>
    )
}

export default FormSection