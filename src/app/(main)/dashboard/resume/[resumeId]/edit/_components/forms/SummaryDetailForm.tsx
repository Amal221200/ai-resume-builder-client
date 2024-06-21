"use client";
import React, { ChangeEvent, FormEvent, use, useCallback, useId, useState } from 'react'
import { EditResumeContext, TEditResumeContext } from '../providers/EditResumeProvider';
import { updateResume } from '@/lib/actions/resume';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import AIButton from '@/components/buttons/AIButton';
import LoadingButton from '@/components/buttons/LoadingButton';
import { generateAISummary } from '@/lib/actions/gemini_ai';

const PROMPT = `Job Title: {jobTitle}, Depends on job title give me list of summary for 3 experience level:- Senior Level, Mid Level and Freasher level in 3-4 lines in array format, with summary and experience_level Field in JSON Format`

const SummaryDetailForm = ({ enableNav }: { enableNav: (val: boolean) => void }) => {
    const { resumeInfo, setResumeInfo } = use(EditResumeContext) as TEditResumeContext;
    const summary = useId()

    const [loading, setLoading] = useState(false)
    const [generating, setGenerating] = useState(false)
    const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState<Array<{ experience_level: number, summary: string }>>([])


    const handleInput = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        setResumeInfo({ ...resumeInfo, attributes: { ...resumeInfo.attributes, [e.currentTarget.name]: e.currentTarget.value } })
        enableNav(false)
    }, [resumeInfo, setResumeInfo, enableNav])

    const onGenerateAISummary = useCallback(async () => {
        setGenerating(true)
        const response = await generateAISummary(PROMPT.replace('{jobTitle}', resumeInfo.attributes.jobTitle ?? ""))
        setAiGeneratedSummaryList(JSON.parse(response))
        setGenerating(false)
    }, [resumeInfo])

    const onSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        try {
            await updateResume(resumeInfo);
            toast.success("Successfully updated summary.")
        } catch (error) {
            toast.error("Error updating summary.")
        } finally {
            enableNav(true)
            setLoading(false)
        }
    }, [enableNav, resumeInfo])

    return (
        <div className='mt-10 rounded-lg border-t-4 border-t-primary-btn p-2 shadow-lg sm:p-5'>
            <h2 className='text-base font-bold sm:text-lg'>Summary Detail</h2>
            <p className='text-sm sm:text-base'>Tell something about yourself, your passion, and your objective in breif.</p>
            <form onSubmit={onSubmit}>
                <div className='mt-5'>
                    <div className='space-y-2'>
                        <div className='my-3 flex flex-col gap-y-2 sx:flex-row sx:items-center sx:justify-between'>
                            <label className='text-sm' htmlFor={summary}>Summary</label>
                            <AIButton disabled={generating} onClick={onGenerateAISummary} className='ml-auto'>
                                Generate from AI
                            </AIButton>
                        </div>
                        <Textarea rows={6} placeholder='Summary' id={summary} required name='summary' value={resumeInfo.attributes?.summary ?? ''} onChange={handleInput} />
                    </div>
                </div>
                <div className='mt-3 flex justify-end'>
                    <LoadingButton disabled={generating} loading={loading} type='submit'>
                        Save
                    </LoadingButton>
                </div>
            </form>

            {
                !!aiGeneratedSummaryList.length && <div className='my-5'>
                    <h2 className='text-lg font-bold'>Suggestions</h2>
                    {aiGeneratedSummaryList?.map((item, index) => (
                        <div key={index}
                            onClick={() => {
                                setResumeInfo({ ...resumeInfo, attributes: { ...resumeInfo.attributes, summary: item?.summary } })
                                setAiGeneratedSummaryList([])
                            }}
                            className='my-4 cursor-pointer rounded-lg p-5 shadow-lg transition-all hover:bg-foreground/10'>
                            <h2 className='my-1 font-bold text-primary'>Level: {item?.experience_level}</h2>
                            <p>{item?.summary}</p>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default SummaryDetailForm