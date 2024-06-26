"use client"
import { FormEvent, Fragment, use, useCallback, useId, useState } from 'react'
import { EditResumeContext, ResumeActions, TEditResumeContext } from '../../../_components/providers/EditResumeProvider';
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
    _type: "project",
    title: '',
    stack: '',
    link: '',
    description: ''
}

const PROMPT = "Write a 5-7 ATS friendly bullet points about a project of title : {title}, developed by implementing the following {stack}. The lines should be in the form of HTML unordered list."

const ProjectDetailForm = ({ enableNav }: { enableNav: (val: boolean) => void }) => {
    const { resumeInfo, resumeInfoDispatch } = use(EditResumeContext) as TEditResumeContext;
    const title = useId()
    const link = useId()
    const stack = useId()

    const [loading, setLoading] = useState(false)

    const handleInput = useCallback((name: string, value: string, index: number) => {
        const newEntries = resumeInfo.projects.slice()
        newEntries[index][name] = value
        resumeInfoDispatch({ action: ResumeActions.PROJECTS, payload: { projects: newEntries } })
        enableNav(false)
    }, [enableNav, resumeInfo.projects, resumeInfoDispatch])

    const handleAddMore = useCallback(() => {
        const projects = resumeInfo.projects.slice()
        resumeInfoDispatch({ action: ResumeActions.PROJECTS, payload: { projects: [...projects, { ...formField }] } })
    }, [resumeInfo.projects, resumeInfoDispatch])

    const handleRemove = useCallback((index: number) => {
        const projects = resumeInfo.projects.slice()
        resumeInfoDispatch({ action: ResumeActions.PROJECTS, payload: { projects: [...projects.slice(0, index), ...projects.slice(index + 1)] } })
    }, [resumeInfo.projects, resumeInfoDispatch])

    const onSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
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
            toast.success("Successfully updated experience details.")
        } catch (error) {
            toast.error("Error updating experience details.")
        } finally {
            enableNav(true)
            setLoading(false)
        }
    }, [enableNav, resumeInfo])

    const enableAI = useCallback((project: TProject) => !!(project.title && project.stack), [])
    const finalPrompt = useCallback((project: TProject) => PROMPT?.replace("{title}", project.title)?.replace("{stack}", project.stack), [])

    return (
        <div className='extra-small mt-10 rounded-lg border-t-4 border-t-primary-btn p-2 shadow-lg sm:p-5'>
            <h2 className='text-base font-bold sm:text-lg'>Projects (Optional, Recommended for freshers)</h2>
            <p className='text-sm sm:text-base'>Add a few projects to show your achievements.</p>
            <form onSubmit={onSubmit}>
                {
                    resumeInfo.projects.map((project, key) => (
                        <Fragment key={key}>
                            <div className='my-5 grid grid-cols-1 gap-3 rounded-lg border p-3 sm:grid-cols-2'>
                                <div>
                                    <label htmlFor={title} className='text-xs'>Project Title</label>
                                    <Input required value={project.title} id={title} name='title' onInput={(e) => handleInput(e.currentTarget.name, e.currentTarget.value, key)} />
                                </div>
                                <div>
                                    <label htmlFor={link} className='text-xs'>Project URL</label>
                                    <Input type='url' required value={project.link} id={link} name='link' onInput={(e) => handleInput(e.currentTarget.name, e.currentTarget.value, key)} />
                                </div>
                                <div className='sm:col-span-2'>
                                    <label htmlFor={stack} className='text-xs'>Stack</label>
                                    <Input required value={project.stack} id={stack} name='stack' onInput={(e) => handleInput(e.currentTarget.name, e.currentTarget.value, key)} />
                                </div>

                                <div className='sm:col-span-2'>
                                    <RichTextEditor name='description' label='Project Description' loading={loading}
                                        setLoading={(val) => setLoading(val)} value={project.description}
                                        onInput={(name, value) => handleInput(name, value, key)}
                                        prompt={finalPrompt(project)}
                                        enable={enableAI(project)} />
                                </div>
                            </div>

                            <div className='my-3 flex justify-end'>
                                <Button variant="outline" type='button' onClick={() => handleRemove(key)} className='flex gap-1 border-red-900 text-red-700'>
                                    <MinusIcon className='h-4 w-4' /> Remove
                                </Button>
                            </div>

                            {(resumeInfo.projects.length !== key + 1) && <Separator className='my-2 h-[1px]' />}
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