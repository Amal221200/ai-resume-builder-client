"use client";

import { Input } from '@/components/ui/input';
import React, { FormEvent, use, useCallback, useId, useState } from 'react'
import { EditResumeContext, TEditResumeContext } from '../../../_components/providers/EditResumeProvider';
import { toast } from 'sonner';
import LoadingButton from '@/components/buttons/LoadingButton';
import { updateResume } from '@/lib/actions/resume-sanity';

const PersonalDetailForm = ({ enableNav }: { enableNav: (val: boolean) => void }) => {
    const { resumeInfo, setResumeInfo } = use(EditResumeContext) as TEditResumeContext;
    const handleInput = (e: FormEvent<HTMLInputElement>) => {
        setResumeInfo({ ...resumeInfo, [e.currentTarget.name]: e.currentTarget.value })
        enableNav(false)
    }

    const [loading, setLoading] = useState(false)

    const firstName = useId()
    const lastName = useId()
    const address = useId()
    const phone = useId()
    const jobTitle = useId()
    const email = useId()

    const onSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            setLoading(true)
            await updateResume(resumeInfo);
            toast.success("Successfully updated personal information.")
        } catch (error) {
            toast.error("Error updating personal information.")
        } finally {
            enableNav(true)
            setLoading(false)
        }
    }, [enableNav, resumeInfo])

    return (
        <div className='mt-10 rounded-lg border-t-4 border-t-primary-btn p-2 shadow-lg sm:p-5'>
            <h2 className='text-base font-bold sm:text-lg'>Personal Detail (Mandatory)</h2>
            <p className='text-sm sm:text-base'>Get Started with your basic information</p>
            <form onSubmit={onSubmit}>
                <div className='mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2'>
                    <div>
                        <label className='text-sm' htmlFor={firstName}>First Name</label>
                        <Input placeholder='firstName' id={firstName} required name='firstName' defaultValue={resumeInfo?.firstName ?? ''} onInput={handleInput} />
                    </div>
                    <div>
                        <label className='text-sm' htmlFor={lastName}>Last Name</label>
                        <Input placeholder='lastName' id={lastName} required name='lastName' defaultValue={resumeInfo?.lastName ?? ''} onInput={handleInput} />
                    </div>
                    <div className='sm:col-span-2'>
                        <label className='text-sm' htmlFor={jobTitle}>Job Title</label>
                        <Input placeholder='jobTitle' id={jobTitle} required name='jobTitle' defaultValue={resumeInfo?.jobTitle ?? ''} onInput={handleInput} />
                    </div>
                    <div className='sm:col-span-2'>
                        <label className='text-sm' htmlFor={address}>Address</label>
                        <Input placeholder='address' id={address} required name='address' defaultValue={resumeInfo?.address ?? ''} onInput={handleInput} />
                    </div>
                    <div>
                        <label className='text-sm' htmlFor={phone}>Phone</label>
                        <Input placeholder='phone' id={phone} required name='phone' defaultValue={resumeInfo?.phone ?? ''} onInput={handleInput} />
                    </div>
                    <div>
                        <label className='text-sm' htmlFor={email}>Email</label>
                        <Input placeholder='email' id={email} type='email' required name='email' defaultValue={resumeInfo?.email ?? ''} onInput={handleInput} />
                    </div>
                </div>
                <div className='mt-3 flex justify-end'>
                    <LoadingButton loading={loading} type='submit'>
                        Save
                    </LoadingButton>
                </div>
            </form>
        </div>
    )
}

export default PersonalDetailForm