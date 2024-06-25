"use client"
import { useCallback, useState } from 'react'
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, FileText, HomeIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import SectionLoading from './SectionLoading';
import { useParams } from 'next/navigation';

const PersonalDetailForm = dynamic(() => import('./forms/PersonalDetailForm'), { ssr: true, loading: () => <SectionLoading marginTop borderTop /> });
const LinksDetailForm = dynamic(() => import('./forms/LinksDetailForm'), { ssr: true, loading: () => <SectionLoading marginTop borderTop /> });
const SummaryDetailForm = dynamic(() => import('./forms/SummaryDetailForm'), { ssr: true, loading: () => <SectionLoading marginTop borderTop /> });
const ExperienceDetailForm = dynamic(() => import('./forms/ExperienceDetailForm'), { ssr: true, loading: () => <SectionLoading marginTop borderTop /> });
const EducationDetailForm = dynamic(() => import('./forms/EducationDetailForm'), { ssr: true, loading: () => <SectionLoading marginTop borderTop /> });
const SkillsDetailForm = dynamic(() => import('./forms/SkillsDetailForm'), { ssr: true, loading: () => <SectionLoading marginTop borderTop /> });
const ProjectDetailForm = dynamic(() => import('./forms/ProjectDetailForm'), { ssr: true, loading: () => <SectionLoading marginTop borderTop /> });
const CertificateDetailForm = dynamic(() => import('./forms/CertificateDetialForm'), { ssr: true, loading: () => <SectionLoading marginTop borderTop /> });

const FormSection = () => {
    const { resumeId } = useParams()
    const [activeForm, setActiveForm] = useState(parseInt(localStorage.getItem(`step-${resumeId}`) ?? '1'))
    const [enableNav, setEnableNav] = useState(true)
    const onNext = useCallback(() => {
        setActiveForm((current) => current + 1)
        localStorage.setItem(`step-${resumeId}`, (activeForm + 1).toString())
    }, [activeForm, resumeId])

    const onPrevious = useCallback(() => {
        setActiveForm((current) => current - 1)
        localStorage.setItem(`step-${resumeId}`, (activeForm - 1).toString())
    }, [activeForm, resumeId])

    return (
        <div id='no-print' className='no-scrollbar h-[85vh] overflow-auto'>
            <div className='flex items-center justify-between'>
                <div className='flex gap-2'>
                    <Button asChild variant={"btn"} size={'sm'}>
                        <Link href="/dashboard" className='flex gap-2'>
                            <HomeIcon />
                        </Link>
                    </Button>
                    <Button variant={'btn'} size="sm" disabled={!enableNav}>
                        <Link href={`/dashboard/resume/${resumeId}/view`} className='flex items-center gap-1'>
                            <FileText size={20} /> View
                        </Link>
                    </Button>
                </div>
                <div className='flex gap-x-3'>
                    <div className='flex gap-x-3'>
                        <Button onClick={onPrevious} size="sm"
                            className={cn(activeForm === 1 ? "hidden" : 'inline')} disabled={!enableNav}>
                            <ArrowLeft />
                        </Button>
                        {
                            activeForm === 8 ? (
                                <Button variant={'btn'} size="sm" disabled={!enableNav}>
                                    <Link href={`/dashboard/resume/${resumeId}/view`} className='flex items-center gap-1'>
                                        <FileText size={20} /> View
                                    </Link>
                                </Button>
                            ) :
                                (
                                    <Button onClick={onNext}
                                        className={cn('flex gap-2')} disabled={!enableNav} size={'sm'}>
                                        Next <ArrowRight />
                                    </Button>
                                )
                        }
                    </div>
                </div>
            </div>
            {
                activeForm === 1 && <PersonalDetailForm enableNav={(val) => setEnableNav(val)} />
            }
            {
                activeForm === 2 && <LinksDetailForm enableNav={(val) => setEnableNav(val)} />
            }
            {
                activeForm === 3 && <SummaryDetailForm enableNav={(val) => setEnableNav(val)} />
            }
            {
                activeForm === 4 && <ExperienceDetailForm enableNav={(val) => setEnableNav(val)} />
            }
            {
                activeForm === 5 && <EducationDetailForm enableNav={(val) => setEnableNav(val)} />
            }
            {
                activeForm === 6 && <SkillsDetailForm enableNav={(val) => setEnableNav(val)} />
            }
            {
                activeForm === 7 && <ProjectDetailForm enableNav={(val) => setEnableNav(val)} />
            }
            {
                activeForm === 8 && <CertificateDetailForm enableNav={(val) => setEnableNav(val)} />
            }
        </div>
    )
}

export default FormSection