"use client"

import { TResume } from "@/lib/types"
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react"

export type TEditorReviewContext = {resumeInfo: TResume, setResumeInfo: Dispatch<SetStateAction<TResume>>}
export const EditReviewContext = createContext<TEditorReviewContext| undefined>(undefined)

export default function EditReviewProvider({ children, resume }: { children: ReactNode, resume: TResume }) {
    const [resumeInfo, setResumeInfo] = useState(resume)
    return (
        <EditReviewContext.Provider value={{ resumeInfo, setResumeInfo }}>
            {children}
        </EditReviewContext.Provider>
    )
}