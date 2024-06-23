"use client"

import React, { FormEvent, Fragment, use, useCallback, useEffect, useId, useState } from 'react'
import { EditResumeContext, TEditResumeContext } from '../../../_components/providers/EditResumeProvider';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import LoadingButton from '@/components/buttons/LoadingButton';
import { MinusIcon, PlusIcon } from 'lucide-react';
import RichTextEditor from '@/app/(main)/dashboard/resume/[resumeId]/edit/_components/RichTextEditor';
import { Separator } from '@/components/ui/separator';
import { TProject } from '@/lib/types-sanity';
import { updateResume } from '@/lib/actions/resume-sanity';

const formField: TProject = {
    title: '',
    stack: '',
    link: '',
    description: ''
}

const PROMPT = "Write a few line of description about a project of title : {title}, developed by implementing the following stack. The lines should be in the form of HTML unordered list."

const ProjectDetailForm = ({ enableNav }: { enableNav: (val: boolean) => void }) => {
    const { resumeInfo, setResumeInfo } = use(EditResumeContext) as TEditResumeContext;
    const title = useId()
    const link = useId()
    const stack = useId()

    const [loading, setLoading] = useState(false)
    const [projectsList, setProjectsList] = useState(resumeInfo.projects)

    const handleInput = useCallback((e: FormEvent<HTMLInputElement>, index: number) => {
        const newEntries = projectsList.slice()
        const { name, value } = e.currentTarget
        newEntries[index][name] = value
        setProjectsList(newEntries)
        enableNav(false)
    }, [enableNav, projectsList])

    console.log(projectsList[0]);


    const handleDescription = useCallback((name: string, value: string, index: number) => {
        const newEntries = projectsList.slice()
        newEntries[index][name] = value
        console.log(newEntries[index]);

        setProjectsList(newEntries)
        enableNav(false)
    }, [enableNav, projectsList])

    const handleAddMore = useCallback(() => {
        setProjectsList(current => [...current, { ...formField }])
    }, [])

    const handleRemove = useCallback((index: number) => {
        setProjectsList(current => [...current.slice(0, index), ...current.slice(index + 1)])
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

    // const totalExperience = useCallback((experience: TEducation) => getExperience(new Date(experience.startDate), experience.currentlyWorking ? new Date() : new Date(experience.endDate)), [])
    const enableAI = useCallback((project: TProject) => !!(project.title && project.stack), [])
    const finalPrompt = useCallback((project: TProject) => PROMPT?.replace("{title}", project.title)?.replace("{stack}", project.stack), [])

    useEffect(() => {
        setResumeInfo(current => ({ ...current, projects: projectsList }))
    }, [projectsList, setResumeInfo])

    return (
        <div className='extra-small mt-10 rounded-lg border-t-4 border-t-primary-btn p-2 shadow-lg sm:p-5'>
            <h2 className='text-base font-bold sm:text-lg'>Projects</h2>
            <p className='text-sm sm:text-base'>Add a few projects to show your achievements</p>
            <form onSubmit={onSubmit}>
                {
                    projectsList.map((project, key) => (
                        <Fragment key={key}>
                            <div className='my-5 grid grid-cols-1 gap-3 rounded-lg border p-3 sm:grid-cols-2'>
                                <div>
                                    <label htmlFor={title} className='text-xs'>Project Title</label>
                                    <Input required value={project.title} id={title} name='title' onInput={(e) => handleInput(e, key)} />
                                </div>
                                <div>
                                    <label htmlFor={link} className='text-xs'>Project URL</label>
                                    <Input type='url' required value={project.link} id={link} name='link' onInput={(e) => handleInput(e, key)} />
                                </div>
                                <div className='sm:col-span-2'>
                                    <label htmlFor={stack} className='text-xs'>Stack</label>
                                    <Input required value={project.stack} id={stack} name='stack' onInput={(e) => handleInput(e, key)} />
                                </div>

                                <div className='sm:col-span-2'>
                                    <RichTextEditor name='description' label='Project Description' loading={loading}
                                        setLoading={(val) => setLoading(val)} value={project.description}
                                        onInput={(name, value) => handleDescription(name, value, key)}
                                        prompt={finalPrompt(project)}
                                        enable={enableAI(project)} />
                                </div>
                            </div>

                            <div className='my-3 flex justify-end'>
                                <Button variant="outline" type='button' onClick={() => handleRemove(key)} className='flex gap-1 border-red-900 text-red-700'>
                                    <MinusIcon className='h-4 w-4' /> Remove
                                </Button>
                            </div>

                            {(projectsList.length !== key + 1) && <Separator className='my-2 h-[1px]' />}
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

export default ProjectDetailForm