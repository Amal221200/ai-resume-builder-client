"use client"
import { FormEvent, Fragment, use, useCallback, useId, useState } from 'react'
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

  const handleInput = useCallback((name: string, value: string, index: number) => {
    const newEntries = resumeInfo.certificates.slice()
    newEntries[index][name] = value
    resumeInfoDispatch({ action: ResumeActions.CERTIFICATES, payload: { certificates: newEntries } })
    enableNav(false)
  }, [enableNav, resumeInfo.certificates, resumeInfoDispatch])

  const handleAddMore = useCallback(() => {
    const certificates = resumeInfo.certificates.slice()
    resumeInfoDispatch({ action: ResumeActions.CERTIFICATES, payload: { certificates: [...certificates, { ...formField }] } })
  }, [resumeInfo.certificates, resumeInfoDispatch])

  const handleRemove = useCallback((index: number) => {
    const certificates = resumeInfo.certificates.slice()
    resumeInfoDispatch({ action: ResumeActions.CERTIFICATES, payload: { certificates: [...certificates.slice(0, index), ...certificates.slice(index + 1)] } })
    enableNav(false)
  }, [resumeInfo.certificates, resumeInfoDispatch, enableNav])

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
    <div className='mt-10 rounded-lg border-t-4 border-t-primary-btn p-5 shadow-lg'>
      <h2 className='text-base font-bold sm:text-lg'>Certificates (Optional)</h2>
      <p className='text-sm sm:text-base'>Add Your Certificates</p>
      <form onSubmit={onSubmit}>
        {resumeInfo.certificates.map((certificate, key) => (
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
            {(resumeInfo.certificates.length !== key + 1) && <Separator className='my-2 h-[1px]' />}
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