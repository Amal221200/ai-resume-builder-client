import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import React, { ReactNode, useCallback, useState } from 'react'

const DeleteDialog = ({ action, children }: { action: () => Promise<void>, children: ReactNode }) => {
    const [open, setOpen] = useState(false)
    
    const onClose = useCallback((toggle?: boolean) => {
        setOpen(current => toggle ? !current : false)
    }, [])
    
    const [loading, setLoading] = useState(false)
    const onAction = useCallback(async () => {
        setLoading(true)
        await action()
        onClose()
        setLoading(false)
    }, [action, onClose])


    return (
        <AlertDialog>
            <AlertDialogTrigger>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
                    <AlertDialogAction disabled={loading} onClick={onAction} className='bg-primary-btn'>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteDialog