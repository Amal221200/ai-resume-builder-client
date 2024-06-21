"use client"
import { Loader, Loader2, PlusSquareIcon } from 'lucide-react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogAction,
    AlertDialogCancel
} from "@/components/ui/alert-dialog"
import { Input } from '@/components/ui/input'
import { useCallback, useState } from 'react'
import { createResume } from '@/lib/actions/resume'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const AddResume = () => {

    const [resumeTitle, setResumeTitle] = useState('')
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const onCreate = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setLoading(true)
        const response = await createResume(resumeTitle)
        setLoading(false)
        if (!response) {
            return;
        }
        setOpen(false)
        setResumeTitle('')
        router.push(`/dashboard/resume/${response.id}/edit`)
        toast.success('Successfully created')
    }, [resumeTitle, router])

    return (
        <AlertDialog open={open} onOpenChange={() => setOpen(current => !current)}>
            <AlertDialogTrigger asChild>
                <div className='flex h-full cursor-pointer items-center justify-center rounded-lg border border-dashed bg-secondary p-14 py-24 transition-all hover:scale-105 hover:shadow-md'>
                    <PlusSquareIcon />
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Create New Resume?</AlertDialogTitle>
                    <AlertDialogDescription className='space-y-2'>
                        <label>Add a title for your new resume?</label>
                        <Input value={resumeTitle} disabled={loading} pattern='^.+$' className=''
                            onInput={(e) => {
                                setResumeTitle(e.currentTarget.value)
                            }} placeholder='Eg:- Full Stack Resume' />
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
                    <AlertDialogAction disabled={!resumeTitle || loading} onClick={onCreate} className='bg-primary-btn text-white hover:bg-primary-btn/90'>
                        {loading ? <Loader2 className='animate-spin' /> : "Continue"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AddResume