"use client"

import React, { FormEvent, Fragment, use, useCallback, useEffect, useId, useState } from 'react'
import { EditResumeContext, TEditResumeContext } from '../providers/EditResumeProvider';
import { updateResume } from '@/lib/actions/resume';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import LoadingButton from '@/components/buttons/LoadingButton';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { TEducation } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

const formField: TEducation = {
    degree: '',
    universityName: '',
    major: '',
    description: '',
    startDate: '',
    endDate: '',
    currentlyStudying: false,
}

const EducationDetailForm = ({ enableNav }: { enableNav: (val: boolean) => void }) => {
    const { resumeInfo, setResumeInfo } = use(EditResumeContext) as TEditResumeContext;
    const degree = useId()
    const major = useId()
    const universityName = useId()
    const description = useId()
    const startDate = useId()
    const endDate = useId()

    const [loading, setLoading] = useState(false)
    const [educationList, setEducationList] = useState(resumeInfo.attributes.educations)

    const handleInput = useCallback((name: string, value: string, index: number) => {
        const newEntries = educationList.slice()
        newEntries[index][name] = value
        setEducationList(newEntries)
        enableNav(false)
    }, [enableNav, educationList])

    const handleAddMore = useCallback(() => {
        setEducationList(current => [...current, { ...formField }])
    }, [])

    const handleRemove = useCallback((index: number) => {
        setEducationList(current => [...current.slice(0, index), ...current.slice(index + 1)])
    }, [])

    const onSubmit = useCallback(async (e: FormEvent<HTMLFormElement | HTMLTextAreaElement>) => {
        e.preventDefault()
        setLoading(true)
        try {
            const data = resumeInfo.attributes.educations.map(({ id, ...rest }) => ({ ...rest }))
            await updateResume({ ...resumeInfo, attributes: { ...resumeInfo.attributes, educations: data } });
            toast.success("Successfully updated education details.")
        } catch (error) {
            toast.error("Error updating education details.")
        } finally {
            enableNav(true)
            setLoading(false)
        }
    }, [enableNav, resumeInfo])

    useEffect(() => {
        setResumeInfo(current => ({ ...current, attributes: { ...current.attributes, educations: educationList } }))
    }, [educationList, setResumeInfo])


    return (
        <div className='mt-10 rounded-lg border-t-4 border-t-primary-btn p-5 shadow-lg'>
            <h2 className='text-lg font-bold'>Education Details</h2>
            <p>Add Your Previous Education</p>
            <form onSubmit={onSubmit}>
                {
                    educationList.map((education, key) => (
                        <Fragment key={key}>
                            <div className='my-5 grid grid-cols-2 gap-3 rounded-lg border p-3'>
                                <div className='col-span-2'>
                                    <label htmlFor={`${universityName}-${key}`} className='text-xs'>University Name</label>
                                    <Input required value={education.universityName} id={`${universityName}-${key}`} name='universityName' onInput={(e) => handleInput(e.currentTarget.name, e.currentTarget.value, key)} />
                                </div>
                                <div>
                                    <label htmlFor={`${degree}-${key}`} className='text-xs'>Degree</label>
                                    <Input required value={education.degree} id={`${degree}-${key}`} name='degree' onInput={(e) => handleInput(e.currentTarget.name, e.currentTarget.value, key)} />
                                </div>
                                <div>
                                    <label htmlFor={`${major}-${key}`} className='text-xs'>Major</label>
                                    <Input required value={education.major} id={`${major}-${key}`} name='major' onInput={(e) => handleInput(e.currentTarget.name, e.currentTarget.value, key)} />
                                </div>
                                <div>
                                    <label htmlFor={`${startDate}-${key}`} className='text-xs'>Start Date</label>
                                    <Input required value={education.startDate} type='date' id={`${startDate}-${key}`} name='startDate' onInput={(e) => handleInput(e.currentTarget.name, e.currentTarget.value, key)} />
                                </div>
                                <div>
                                    <label htmlFor={`${endDate}-${key}`} className='text-xs'>End Date</label>
                                    <Input required value={education.endDate} type='date' id={`${endDate}-${key}`} name='endDate' onInput={(e) => handleInput(e.currentTarget.name, e.currentTarget.value, key)} />
                                </div>

                                <div className='col-span-2'>
                                    <label htmlFor={description}>Description</label>
                                    <Textarea value={education.description} id={`${description}-${key}`} name='description' onInput={(e) => handleInput(e.currentTarget.name, e.currentTarget.value, key)} />
                                </div>
                            </div>

                            <div className='my-3 flex justify-end'>
                                <Button variant="outline" type='button' onClick={() => handleRemove(key)} className='flex gap-1 border-red-900 text-red-700'>
                                    <MinusIcon className='h-4 w-4' /> Remove
                                </Button>
                            </div>

                            {(educationList.length !== key + 1) && <Separator className='my-2 h-[1px]' />}
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

export default EducationDetailForm