"use client"
import { FormEvent, Fragment, use, useCallback, useEffect, useId, useState } from 'react'
import { EditResumeContext, ResumeActions, TEditResumeContext } from '../../../_components/providers/EditResumeProvider'
import { toast } from 'sonner'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { MinusIcon, PlusIcon } from 'lucide-react'
import LoadingButton from '@/components/buttons/LoadingButton'
import { Input } from '@/components/ui/input'
import { TLink } from '@/lib/types-sanity'
import { updateResume } from '@/lib/actions/resume-sanity'

const formField: TLink = {
  _type: "link",
  label: "",
  url:''
}

const LinksDetail = ({ enableNav }: { enableNav: (val: boolean) => void }) => {
  const { resumeInfo, resumeInfoDispatch } = use(EditResumeContext) as TEditResumeContext;
  const label = useId()
  const url = useId()

  const [loading, setLoading] = useState(false)
  const [linksList, setLinksList] = useState(resumeInfo.links)

  const handleInput = useCallback((name: string, value: string, index: number) => {
    const newEntries = linksList.slice()
    newEntries[index][name] = value
    setLinksList(newEntries)
    enableNav(false)
  }, [linksList, enableNav])

  const handleAddMore = useCallback(() => {
    setLinksList(current => [...current, { ...formField }])
  }, [])

  const handleRemove = useCallback((index: number) => {
    setLinksList(current => [...current.slice(0, index), ...current.slice(index + 1)])
  }, [])

  const onSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      await updateResume({ ...resumeInfo });
      toast.success("Successfully updated education details.")
    } catch (error) {
      toast.error("Error updating education details.")
    } finally {
      enableNav(true)
      setLoading(false)
    }
  }, [resumeInfo, enableNav])

  useEffect(() => {
    resumeInfoDispatch({ action: ResumeActions.LINKS, payload: { links: linksList } })
  }, [linksList, resumeInfoDispatch])

  return (
    <div className='mt-10 rounded-lg border-t-4 border-t-primary-btn p-2 shadow-lg sm:p-5'>
      <h2 className='text-base font-bold sm:text-lg'>Links (Recommended)</h2>
      <p className='text-sm sm:text-base'>Add Your Links</p>
      <form onSubmit={onSubmit}>
        {linksList.map((link, key) => (
          <Fragment key={key}>
            <div className='my-5 grid grid-cols-1 gap-3 rounded-lg border p-3 sm:grid-cols-2'>
              <div>
                <label htmlFor={label} className='text-xs'>Label</label>
                <Input value={link.label} required name='label' id={label} onInput={(e) => handleInput(e.currentTarget.name, e.currentTarget.value, key)} />
              </div>
              <div>
                <label htmlFor={url} className='text-xs'>URL</label>
                <Input value={link.url} type='url' required name='url' id={url} onInput={(e) => handleInput(e.currentTarget.name, e.currentTarget.value, key)} />
              </div>
            </div>
            <div className='my-3 flex justify-end'>
              <Button variant="outline" type='button' onClick={() => handleRemove(key)} className='flex gap-1 border-red-900 text-red-700'>
                <MinusIcon className='h-4 w-4' /> Remove
              </Button>
            </div>
            {(linksList.length !== key + 1) && <Separator className='my-2 h-[1px]' />}
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

export default LinksDetail