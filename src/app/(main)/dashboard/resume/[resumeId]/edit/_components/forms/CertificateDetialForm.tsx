"use client"
import { FormEvent, Fragment, use, useCallback, useEffect, useId, useState } from 'react'
import { EditResumeContext, ResumeActions, TEditResumeContext } from '../../../_components/providers/EditResumeProvider'
import { toast } from 'sonner'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { MinusIcon, PlusIcon } from 'lucide-react'
import LoadingButton from '@/components/buttons/LoadingButton'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { updateResume } from '@/lib/actions/resume-sanity'
import { TCertificate } from '@/lib/types-sanity'

const formField: TCertificate = {
  _type: "certificate",
  title: "",
  link: "",
  provider: "",
  description: ""
}

const CertificatesDetail = ({ enableNav }: { enableNav: (val: boolean) => void }) => {
  const { resumeInfo, resumeInfoDispatch } = use(EditResumeContext) as TEditResumeContext;
  const title = useId()
  const link = useId()
  const provider = useId()
  const description = useId()

  const [loading, setLoading] = useState(false)
  const [certificatesList, setCertificatesList] = useState(resumeInfo.certificates)

  const handleInput = useCallback((name: string, value: string, index: number) => {
    const newEntries = certificatesList.slice()
    newEntries[index][name] = value
    setCertificatesList(newEntries)
    enableNav(false)
  }, [certificatesList, enableNav])

  const handleAddMore = useCallback(() => {
    setCertificatesList(current => [...current, { ...formField }])
  }, [])

  const handleRemove = useCallback((index: number) => {
    setCertificatesList(current => [...current.slice(0, index), ...current.slice(index + 1)])
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
    resumeInfoDispatch({ action: ResumeActions.CERTIFICATES, payload: { certificates: certificatesList } })
  }, [certificatesList, resumeInfoDispatch])

  return (
    <div className='mt-10 rounded-lg border-t-4 border-t-primary-btn p-5 shadow-lg'>
      <h2 className='text-base font-bold sm:text-lg'>Certificates (Optional)</h2>
      <p className='text-sm sm:text-base'>Add Your Certificates</p>
      <form onSubmit={onSubmit}>
        {certificatesList.map((certificate, key) => (
          <Fragment key={key}>
            <div className='my-5 grid grid-cols-1 gap-3 rounded-lg border p-3 sm:grid-cols-2'>
              <div>
                <label htmlFor={title} className='text-xs'>Certificate Title</label>
                <Input value={certificate.title} required name='title' id={title} onInput={(e) => handleInput(e.currentTarget.name, e.currentTarget.value, key)} />
              </div>
              <div>
                <label htmlFor={link} className='text-xs'>Certificate Link</label>
                <Input value={certificate.link} name='link' id={link} onInput={(e) => handleInput(e.currentTarget.name, e.currentTarget.value, key)} />
              </div>
              <div>
                <label htmlFor={provider} className='text-xs'>Certificate Provider</label>
                <Input value={certificate.provider} required name='provider' id={provider} onInput={(e) => handleInput(e.currentTarget.name, e.currentTarget.value, key)} />
              </div>
              <div className='sm:col-span-2'>
                <label htmlFor={description} className='text-xs'>Description</label>
                <Textarea value={certificate.description} id={description} name='description' onInput={(e) => handleInput(e.currentTarget.name, e.currentTarget.value, key)} />
              </div>
            </div>
            <div className='my-3 flex justify-end'>
              <Button variant="outline" type='button' onClick={() => handleRemove(key)} className='flex gap-1 border-red-900 text-red-700'>
                <MinusIcon className='h-4 w-4' /> Remove
              </Button>
            </div>
            {(certificatesList.length !== key + 1) && <Separator className='my-2 h-[1px]' />}
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

export default CertificatesDetail