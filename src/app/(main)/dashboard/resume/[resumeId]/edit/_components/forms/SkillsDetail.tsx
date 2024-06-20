"use client"

import { TSkill } from '@/lib/types'
import React, { FormEvent, Fragment, use, useCallback, useEffect, useId, useState } from 'react'
import { EditReviewContext, TEditorReviewContext } from '../providers/EditReviewProvider'
import { updateResume } from '@/lib/actions/resume'
import { toast } from 'sonner'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { MinusIcon, PlusIcon } from 'lucide-react'
import LoadingButton from '@/components/buttons/LoadingButton'
import { Input } from '@/components/ui/input'
import Rating from '../Rating'

const formField: TSkill = {
  name: "",
  rating: 0
}

const SkillsDetail = ({ enableNav }: { enableNav: (val: boolean) => void }) => {
  const { resumeInfo, setResumeInfo } = use(EditReviewContext) as TEditorReviewContext;
  const name = useId()

  const [loading, setLoading] = useState(false)
  const [skillsList, setSkillsList] = useState([...(resumeInfo.attributes.skills?.length) ? resumeInfo.attributes.skills : []])

  const handleInput = useCallback((name: string, value: string, index: number) => {
    const newEntries = skillsList.slice()
    newEntries[index][name] = value
    setSkillsList(newEntries)
    enableNav(false)
  }, [skillsList, enableNav])

  const handleAddMore = useCallback(() => {
    setSkillsList(current => [...current, { ...formField }])
  }, [])

  const handleRemove = useCallback((index: number) => {
    setSkillsList(current => [...current.slice(0, index), ...current.slice(index + 1)])
  }, [])

  const onSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    console.log("hello");

    try {
      const data = resumeInfo.attributes.education.map(({ id, ...rest }) => ({ ...rest }))
      await updateResume({ ...resumeInfo, attributes: { ...resumeInfo.attributes, education: data } });
      toast.success("Successfully updated education details.")
    } catch (error) {
      toast.error("Error updating education details.")
    } finally {
      enableNav(true)
      setLoading(false)
    }
  }, [resumeInfo, enableNav])

  useEffect(() => {
    setResumeInfo(current => ({ ...current, attributes: { ...current.attributes, skills: skillsList } }))
  }, [skillsList, setResumeInfo])

  return (
    <div className='mt-10 rounded-lg border-t-4 border-t-primary-btn p-5 shadow-lg'>
      <h2 className='text-lg font-bold'>Skills</h2>
      <p>Add Your Skills</p>
      <form onSubmit={onSubmit}>
        {skillsList.map((skill, key) => (
          <Fragment key={key}>
            <div className='my-5 grid grid-cols-2 gap-3 rounded-lg border p-3'>
              <div>
                <label htmlFor={name} className='text-xs'>Name</label>
                <Input value={skill.name} name='name' id={name} onInput={(e) => handleInput(e.currentTarget.name, e.currentTarget.value, key)} />
              </div>
              <div>
                <label htmlFor={name} className='text-xs'>Rating</label>
                <Rating value={skill.rating} onChange={(val) => handleInput('rating', val.toString(), key)} />
              </div>
            </div>
            <div className='my-3 flex justify-end'>
              <Button variant="outline" type='button' onClick={() => handleRemove(key)} className='flex gap-1 border-red-900 text-red-700'>
                <MinusIcon className='h-4 w-4' /> Remove
              </Button>
            </div>
            {(skillsList.length !== key + 1) && <Separator className='my-2 h-[1px]' />}
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