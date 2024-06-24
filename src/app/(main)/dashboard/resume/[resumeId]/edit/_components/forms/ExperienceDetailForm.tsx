"use client"

import React, { FormEvent, Fragment, use, useCallback, useEffect, useId, useMemo, useState } from 'react'
import { EditResumeContext, TEditResumeContext } from '../../../_components/providers/EditResumeProvider';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import LoadingButton from '@/components/buttons/LoadingButton';
import { MinusIcon, PlusIcon } from 'lucide-react';
import RichTextEditor from '@/app/(main)/dashboard/resume/[resumeId]/edit/_components/RichTextEditor';
import { Separator } from '@/components/ui/separator';
import { getExperience } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { TExperience } from '@/lib/types-sanity';
import { updateResume } from '@/lib/actions/resume-sanity';

const formField: TExperience = {
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    skills: '',
    workSummary: '',
    currentlyWorking: false
}

const PROMPT = 'position titile: {title}, experience: {experience}, skills: {skills}, depends on position title, skills, and given experience, give me 5-7 bullet points for my experience in resume (Please do not add experince level and No JSON array), give me result in HTML unordered list.'

const ExperienceDetailForm = ({ enableNav }: { enableNav: (val: boolean) => void }) => {
    const { resumeInfo, setResumeInfo } = use(EditResumeContext) as TEditResumeContext;
    const title = useId()
    const companyName = useId()
    const city = useId()
    const state = useId()
    const startDate = useId()
    const endDate = useId()
    const skills = useId()
    const currentlyWorking = useId()

    const [loading, setLoading] = useState(false)
    const [experienceList, setExperienceList] = useState(resumeInfo.experiences)

    const handleInput = useCallback((name: string, value: string | boolean, index: number) => {
        const newEntries = experienceList.slice()
        newEntries[index][name] = value
        setExperienceList(newEntries)
        enableNav(false)
    }, [enableNav, experienceList])

    const handleAddMore = useCallback(() => {
        setExperienceList(current => [...current, { ...formField }])
    }, [])

    const handleRemove = useCallback((index: number) => {
        setExperienceList(current => [...current.slice(0, index), ...current.slice(index + 1)])
    }, [])

    const onSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        try {
            await updateResume({ ...resumeInfo });
            toast.success("Successfully updated experience details.")
        } catch (error) {
            toast.error("Error updating experience details.")
        } finally {
            enableNav(true)
            setLoading(false)
        }
    }, [enableNav, resumeInfo])

    const totalExperience = useCallback((experience: TExperience) => getExperience(new Date(experience.startDate), experience.currentlyWorking ? new Date() : new Date(experience.endDate)), [])
    const enableAI = useCallback((experience: TExperience) => !!(experience.title && experience.skills && experience.startDate && (experience.currentlyWorking || experience.endDate)), [])
    const finalPrompt = useCallback((experience: TExperience) => PROMPT.replace('{title}', experience.title).replace('{experience}', totalExperience(experience)).replace('{skills}', experience.skills), [totalExperience])

    useEffect(() => {
        setResumeInfo(current => ({ ...current, experiences: experienceList }))
    }, [experienceList, setResumeInfo])

    return (
        <div className='mt-10 rounded-lg border-t-4 border-t-primary-btn p-2 shadow-lg sm:p-5'>
            <h2 className='text-base font-bold sm:text-lg'>Professional Experience</h2>
            <p className='text-sm sm:text-base'>Add Your Previous Job Experience</p>
            <form onSubmit={onSubmit}>
                {
                    experienceList.map((experience, key) => (
                        <Fragment key={key}>
                            <div className='my-5 grid grid-cols-1 gap-3 rounded-lg border p-3 sm:grid-cols-2'>
                                <div>
                                    <label htmlFor={title} className='text-xs'>Job Title</label>
                                    <Input required value={experience.title} id={title} name='title' onInput={(e) => handleInput(e.currentTarget.name, e.currentTarget.value, key)} />
                                </div>
                                <div>
                                    <label htmlFor={companyName} className='text-xs'>Company</label>
                                    <Input required value={experience.companyName} id={companyName} name='companyName' onInput={(e) => handleInput(e.currentTarget.name, e.currentTarget.value, key)} />
                                </div>
                                <div>
                                    <label htmlFor={city} className='text-xs'>City</label>
                                    <Input required value={experience.city} id={city} name='city' onInput={(e) => handleInput(e.currentTarget.name, e.currentTarget.value, key)} />
                                </div>
                                <div>
                                    <label htmlFor={state} className='text-xs'>State</label>
                                    <Input required value={experience.state} id={state} name='state' onInput={(e) => handleInput(e.currentTarget.name, e.currentTarget.value, key)} />
                                </div>
                                <div>
                                    <label htmlFor={startDate} className='text-xs'>Start Date</label>
                                    <Input required value={experience.startDate} type='date' id={startDate} name='startDate' onInput={(e) => handleInput(e.currentTarget.name, e.currentTarget.value, key)} />
                                </div>
                                <div>
                                    <div className="mb-2 flex justify-between">
                                        <label htmlFor={endDate} className='text-xs'>End Date</label>
                                        <div className='flex items-center gap-2'>
                                            <Checkbox name='currentlyWorking' id={currentlyWorking} checked={experience.currentlyWorking} onCheckedChange={(e) => {
                                                handleInput('currentlyWorking', e, key)
                                                experience.endDate = ''
                                            }} />
                                            <label htmlFor={currentlyWorking} className='ml-2 text-xs'>Present</label>
                                        </div>
                                    </div>
                                    {
                                        experience.currentlyWorking ||
                                        <Input required value={experience.endDate} type='date' id={endDate} name='endDate' onInput={(e) => handleInput(e.currentTarget.name, e.currentTarget.value, key)} />
                                    }
                                </div>
                                <div className='sm:col-span-2'>
                                    <label htmlFor={skills} className='text-xs'>
                                        Skills (For better summary generation)
                                    </label>
                                    <Input required value={experience.skills} id={skills} name='skills' onInput={(e) => handleInput(e.currentTarget.name, e.currentTarget.value, key)} />
                                </div>

                                <div className='sm:col-span-2'>
                                    <RichTextEditor name='workSummary' label='Work Summary'
                                        loading={loading} setLoading={(val) => setLoading(val)} value={experience.workSummary}
                                        onInput={(name, value) => handleInput(name, value, key)} enable={enableAI(experience)}
                                        prompt={finalPrompt(experience)} />
                                </div>
                            </div>

                            <div className='my-3 flex justify-end'>
                                <Button variant="outline" type='button' onClick={() => handleRemove(key)} className='flex gap-1 border-red-900 text-red-700'>
                                    <MinusIcon className='h-4 w-4' /> Remove
                                </Button>
                            </div>

                            {(experienceList.length !== key + 1) && <Separator className='my-2 h-[1px]' />}
                        </Fragment>
                    ))
                }
                <Separator className='my-3 h-[2px]' />
                <div className='flex justify-between'>
                    <Button variant="outline" type='button' onClick={handleAddMore} className='flex gap-1 text-primary-btn'>
                        <PlusIcon className='h-4 w-4' /> Add
                    </Button>
                    <LoadingButton loading={loading} type='submit'>
                        Save
                    </LoadingButton>
                </div>
            </form>
        </div>
    )
}

export default ExperienceDetailForm