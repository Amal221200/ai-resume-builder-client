"use client"
import { FormEvent, Fragment, use, useCallback, useId, useState } from 'react'
import { EditResumeContext, ResumeActions, TEditResumeContext } from '../../../_components/providers/EditResumeProvider'
import { toast } from 'sonner'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { MinusIcon, PlusIcon } from 'lucide-react'
import LoadingButton from '@/components/buttons/LoadingButton'
import { Input } from '@/components/ui/input'
import { TSkill } from '@/lib/types-sanity'
import { updateResume } from '@/lib/actions/resume-sanity'

const formField: TSkill = {
  _type: "skill",
  name: "",
}

const SkillsDetail = ({ enableNav }: { enableNav: (val: boolean) => void }) => {
  const { resumeInfo, resumeInfoDispatch } = use(EditResumeContext) as TEditResumeContext;
  const name = useId()

  const [loading, setLoading] = useState(false)

  const handleInput = useCallback((name: string, value: string, index: number) => {
    const newEntries = resumeInfo.skills.slice()
    newEntries[index][name] = value
    resumeInfoDispatch({ action: ResumeActions.SKILLS, payload: { skills: newEntries } })
    enableNav(false)
  }, [resumeInfo.skills, enableNav, resumeInfoDispatch])

  const handleAddMore = useCallback(() => {
    const skills = resumeInfo.skills.slice()
    resumeInfoDispatch({ action: ResumeActions.SKILLS, payload: { skills: [...skills, { ...formField }] } })
  }, [resumeInfo.skills, resumeInfoDispatch])

  const handleRemove = useCallback((index: number) => {
    const skills = resumeInfo.skills.slice()
    resumeInfoDispatch({
      action: ResumeActions.SKILLS,
      payload: {
        skills: [...skills.slice(0, index), ...skills.slice(index + 1)]
      }
    })
    enableNav(false)
  }, [resumeInfo.skills, resumeInfoDispatch, enableNav])

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
      toast.success("Successfully updated education details.")
    } catch (error) {
      toast.error("Error updating education details.")
    } finally {
      enableNav(true)
      setLoading(false)
    }
  }, [resumeInfo, enableNav])

  return (
    <div className='mt-10 rounded-lg border-t-4 border-t-primary-btn p-2 shadow-lg sm:p-5'>
      <h2 className='text-base font-bold sm:text-lg'>Skills (Recommended)</h2>
      <p className='text-sm sm:text-base'>Add Your Skills</p>
      <form onSubmit={onSubmit}>
        {resumeInfo.skills.map((skill, key) => (
          <Fragment key={key}>
            <div className='my-5 grid grid-cols-1 gap-3 rounded-lg border p-3 sm:grid-cols-2'>
              <div>
                <label htmlFor={name} className='text-xs'>Name</label>
                <Input value={skill.name} required maxLength={13} name='name' id={name} onInput={(e) => handleInput(e.currentTarget.name, e.currentTarget.value, key)} />
              </div>
            </div>
            <div className='my-3 flex justify-end'>
              <Button variant="outline" type='button' onClick={() => handleRemove(key)} className='flex gap-1 border-red-900 text-red-700'>
                <MinusIcon className='h-4 w-4' /> Remove
              </Button>
            </div>
            {(resumeInfo.skills.length !== key + 1) && <Separator className='my-2 h-[1px]' />}
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

export default SkillsDetail