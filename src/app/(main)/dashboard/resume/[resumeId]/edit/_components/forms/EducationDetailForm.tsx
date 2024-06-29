"use client"
import { FormEvent, Fragment, use, useCallback, useId, useState } from 'react'
import { EditResumeContext, ResumeActions, TEditResumeContext } from '../../../_components/providers/EditResumeProvider';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import LoadingButton from '@/components/buttons/LoadingButton';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { TEducation } from '@/lib/types-sanity';
import { updateResume } from '@/lib/actions/resume-sanity';

const formField: TEducation = {
    _type: "education",
    degree: '',
    universityName: '',
    major: '',
    description: '',
    startDate: '',
    endDate: '',
    currentlyStudying: false,
}

const EducationDetailForm = ({ enableNav }: { enableNav: (val: boolean) => void }) => {
    const { resumeInfo, resumeInfoDispatch } = use(EditResumeContext) as TEditResumeContext;
    const degree = useId()
    const major = useId()
    const universityName = useId()
    const description = useId()
    const startDate = useId()
    const endDate = useId()
    const currentlyStuding = useId()

    const [loading, setLoading] = useState(false)

    const handleInput = useCallback((name: string, value: string | boolean, index: number) => {
        const newEntries = resumeInfo.educations.slice()
        newEntries[index][name] = value
        resumeInfoDispatch({ action: ResumeActions.EDUCATIONS, payload: { educations: newEntries } })
        enableNav(false)
    }, [enableNav, resumeInfo.educations, resumeInfoDispatch])

    const handleAddMore = useCallback(() => {
        const educations = resumeInfo.educations.slice()
        resumeInfoDispatch({ action: ResumeActions.EDUCATIONS, payload: { educations: [...educations, { ...formField }] } })
    }, [resumeInfo.educations, resumeInfoDispatch])

    const handleRemove = useCallback((index: number) => {
        const educations = resumeInfo.educations.slice()
        resumeInfoDispatch({ action: ResumeActions.EDUCATIONS, payload: { educations: [...educations.slice(0, index), ...educations.slice(index + 1)] } })
        enableNav(false)
    }, [resumeInfo.educations, resumeInfoDispatch, enableNav])

    const onSubmit = useCallback(async (e: FormEvent<HTMLFormElement | HTMLTextAreaElement>) => {
        e.preventDefault()
        setLoading(true)
        try {
            if (resumeInfo.user_email === 'johndoe@example.com') {
                toast.warning("This is an example resume for showcase. You can create your own resume to change the data.", {
                    position: 'top-center'
                })
                return
            }
            await updateResume({ ...resumeInfo });
            toast.success("Successfully updated education details.")
        } catch (error) {
            toast.error("Error updating education details.")
        } finally {
            enableNav(true)
            setLoading(false)
        }
    }, [enableNav, resumeInfo])

    return (
        <div className='mt-10 rounded-lg border-t-4 border-t-primary-btn p-2 shadow-lg sm:p-5'>
            <h2 className='text-base font-bold sm:text-lg'>Education Details (Recommended for freshers)</h2>
            <p className='text-sm sm:text-base'>Add Your Previous Education</p>
            <form onSubmit={onSubmit}>
                {
                    resumeInfo.educations.map((education, key) => (
                        <Fragment key={key}>
                            <div className='my-5 grid grid-cols-1 gap-3 rounded-lg border p-3 sm:grid-cols-2'>
                                <div className='sm:col-span-2'>
                                    <label htmlFor={universityName} className='text-xs'>University Name</label>
                                    <Input required value={education.universityName} id={universityName} name='universityName' onInput={(e) => handleInput(e.currentTarget.name, e.currentTarget.value, key)} />
                                </div>
                                <div>
                                    <label htmlFor={degree} className='text-xs'>Degree</label>
                                    <Input required value={education.degree} id={degree} name='degree' onInput={(e) => handleInput(e.currentTarget.name, e.currentTarget.value, key)} />
                                </div>
                                <div>
                                    <label htmlFor={major} className='text-xs'>Major</label>
                                    <Input required value={education.major} id={major} name='major' onInput={(e) => handleInput(e.currentTarget.name, e.currentTarget.value, key)} />
                                </div>
                                <div>
                                    <label htmlFor={startDate} className='text-xs'>Start Date</label>
                                    <Input required value={education.startDate} type='date' id={startDate} name='startDate' onInput={(e) => handleInput(e.currentTarget.name, e.currentTarget.value, key)} />
                                </div>
                                <div>
                                    <div className='mb-2 flex justify-between'>
                                        <label htmlFor={endDate} className='text-xs'>End Date</label>
                                        <div className='flex items-center gap-2'>
                                            <Checkbox name='currentlyStudying' id={currentlyStuding} checked={education.currentlyStudying}
                                                onCheckedChange={(e) => {
                                                    handleInput('currentlyStudying', e, key)
                                                    education.endDate = ''
                                                }} />
                                            <label htmlFor={currentlyStuding} className='text-xs'>Present</label>
                                        </div>
                                    </div>
                                    {
                                        education.currentlyStudying ||
                                        <Input required value={education.endDate} type='date' id={endDate} name='endDate' onInput={(e) => handleInput(e.currentTarget.name, e.currentTarget.value, key)} />
                                    }
                                </div>
                                <div className='sm:col-span-2'>
                                    <label htmlFor={description}>Description</label>
                                    <Textarea value={education.description} id={`${description}-${key}`} name='description' onInput={(e) => handleInput(e.currentTarget.name, e.currentTarget.value, key)} />
                                </div>
                            </div>

                            <div className='my-3 flex justify-end'>
                                <Button variant="outline" type='button' onClick={() => handleRemove(key)} className='flex gap-1 border-red-900 text-red-700'>
                                    <MinusIcon className='h-4 w-4' /> Remove
                                </Button>
                            </div>

                            {(resumeInfo.educations.length !== key + 1) && <Separator className='my-2 h-[1px]' />}
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