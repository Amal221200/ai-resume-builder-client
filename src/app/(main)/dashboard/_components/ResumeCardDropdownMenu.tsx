"use client"
import { ReactNode, useCallback, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Download, Loader2, Pen, Trash, View } from "lucide-react"
import { useRouter } from "next13-progressbar"
import { deleteResume } from "@/lib/actions/resume-sanity"
import { toast } from 'sonner'

const ResumeCardDropdownMenu = ({ children, resumeId }: { children: ReactNode, resumeId: string }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const action = useCallback(async () => {
        try {
            setLoading(true)
            await deleteResume(resumeId)
            toast.success("Successfully deleted")
        } catch (error) {
            toast.error("Failed to deleted")
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }, [resumeId])



    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => router.push(`/dashboard/resume/${resumeId}/edit`)}>
                        <Pen size={15} className="mr-2" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/dashboard/resume/${resumeId}/view`)}>
                        <View size={15} className="mr-2" /> View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/dashboard/resume/${resumeId}/view`)}>
                        <Download size={15} className="mr-2" /> Download
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)} className="bg-destructive hover:bg-destructive-foreground">
                        <Trash size={15} className="mr-2" /> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialog open={open}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            resume and remove your data from our server.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={loading} onClick={() => setOpen(false)} className='disabled:opacity-80'>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction disabled={loading} onClick={action} className='bg-primary-btn disabled:opacity-80'>
                            {loading ? <Loader2 className='animate-spin' /> : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>

    )
}

export default ResumeCardDropdownMenu