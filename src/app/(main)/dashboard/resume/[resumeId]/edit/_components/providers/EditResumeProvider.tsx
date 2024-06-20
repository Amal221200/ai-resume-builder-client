"use client"

import { TResume } from "@/lib/types"
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react"

export type TEditResumeContext = {resumeInfo: TResume, setResumeInfo: Dispatch<SetStateAction<TResume>>}
export const EditResumeContext = createContext<TEditResumeContext| undefined>(undefined)

export default function EditResumeProvider({ children, resume }: { children: ReactNode, resume: TResume }) {
    const [resumeInfo, setResumeInfo] = useState(resume)
    return (
        <EditResumeContext.Provider value={{ resumeInfo, setResumeInfo }}>
            {children}
        </EditResumeContext.Provider>
    )
}