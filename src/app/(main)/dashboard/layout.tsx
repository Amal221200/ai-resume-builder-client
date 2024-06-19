import Header from '@/components/Header'
import dynamic from 'next/dynamic'
import React, { ReactNode } from 'react'

const Toaster = dynamic(() => import('@/components/ui/sonner'), {})

const DashboardLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Header />
            {children}
            <Toaster richColors position='top-right' />
        </>
    )
}

export default DashboardLayout