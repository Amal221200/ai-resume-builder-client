"use client";
import { Button } from '@/components/ui/button';
import React, { ChangeEvent, FormEvent, use, useCallback, useId, useState } from 'react'
import { EditReviewContext, TEditorReviewContext } from '../providers/EditReviewProvider';
import { updateResume } from '@/lib/actions/resume';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';

const SummaryDetailForm = ({ enableNext }: { enableNext: (val: boolean) => void }) => {
    const { resumeInfo, setResumeInfo } = use(EditReviewContext) as TEditorReviewContext;
    const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setResumeInfo({ ...resumeInfo, attributes: { ...resumeInfo.attributes, [e.currentTarget.name]: e.currentTarget.value } })
        enableNext(false)
    }

    const [loading, setLoading] = useState(false)
    const summary = useId()

    const onSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        await updateResume(resumeInfo);
        enableNext(true)
        setLoading(false)
        toast.success("Successfully updated summary.")
    }, [enableNext, resumeInfo])

    return (
        <div className='mt-10 rounded-lg border-t-4 border-t-primary-btn p-5 shadow-lg'>
            <h2 className='text-lg font-bold'>Summary Detail</h2>
            <p>Tell something about yourself, your passion, and your objective in breif.</p>
            <form onSubmit={onSubmit}>
                <div className='mt-5 grid grid-cols-2 gap-3'>
                    <div className='col-span-2 space-y-2'>
                        <label className='text-sm' htmlFor={summary}>Summary</label>
                        <Textarea rows={6} placeholder='Summary' id={summary} required name='summary' defaultValue={resumeInfo.attributes?.summary ?? ''} onChange={handleInput} />
                    </div>
                </div>
                <div className='mt-3 flex justify-end'>
                    <Button disabled={loading} type='submit' variant="btn">
                        {loading ? <Loader2 className='animate-spin' /> : "Save"}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SummaryDetailForm