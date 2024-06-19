"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { FormEvent, use, useCallback, useId, useState } from 'react'
import { EditReviewContext, TEditorReviewContext } from '../providers/EditReviewProvider';
import { updateResume } from '@/lib/actions/resume';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const PersonalDetailForm = ({ enableNext }: { enableNext: (val: boolean) => void }) => {
    const { resumeInfo, setResumeInfo } = use(EditReviewContext) as TEditorReviewContext;
    const handleInput = (e: FormEvent<HTMLInputElement>) => {
        setResumeInfo({ ...resumeInfo, attributes: { ...resumeInfo.attributes, [e.currentTarget.name]: e.currentTarget.value } })
        enableNext(false)
    }

    const [loading, setLoading] = useState(false)

    const firstName = useId()
    const lastName = useId()
    const address = useId()
    const phone = useId()
    const jobTitle = useId()
    const email = useId()

    const onSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        await updateResume(resumeInfo);
        enableNext(true)
        setLoading(false)
        toast.success("Successfully updated personal information.")
    }, [enableNext, resumeInfo])

    return (
        <div className='mt-10 rounded-lg border-t-4 border-t-primary-btn p-5 shadow-lg'>
            <h2 className='text-lg font-bold'>Personal Detail</h2>
            <p>Get Started with your basic information</p>
            <form onSubmit={onSubmit}>
                <div className='mt-5 grid grid-cols-2 gap-3'>
                    <div>
                        <label className='text-sm' htmlFor={firstName}>First Name</label>
                        <Input placeholder='firstName' id={firstName} required name='firstName' defaultValue={resumeInfo.attributes?.firstName ?? ''} onInput={handleInput} />
                    </div>
                    <div>
                        <label className='text-sm' htmlFor={lastName}>Last Name</label>
                        <Input placeholder='lastName' id={lastName} required name='lastName' defaultValue={resumeInfo.attributes?.lastName ?? ''} onInput={handleInput} />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm' htmlFor={jobTitle}>Job Title</label>
                        <Input placeholder='jobTitle' id={jobTitle} required name='jobTitle' defaultValue={resumeInfo.attributes?.jobTitle ?? ''} onInput={handleInput} />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm' htmlFor={address}>Address</label>
                        <Input placeholder='address' id={address} required name='address' defaultValue={resumeInfo.attributes?.address ?? ''} onInput={handleInput} />
                    </div>
                    <div>
                        <label className='text-sm' htmlFor={phone}>Phone</label>
                        <Input placeholder='phone' id={phone} required name='phone' defaultValue={resumeInfo.attributes?.phone ?? ''} onInput={handleInput} />
                    </div>
                    <div>
                        <label className='text-sm' htmlFor={email}>Email</label>
                        <Input placeholder='email' id={email} type='email' required name='email' defaultValue={resumeInfo.attributes?.email ?? ''} onInput={handleInput} />
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

export default PersonalDetailForm