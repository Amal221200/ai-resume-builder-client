"use client"
import { TResume } from "@/lib/types-sanity"
import { createContext, Dispatch, ReactNode, useMemo, useReducer } from "react"

export enum ResumeActions {
    PERSONAL_INFO,
    SUMMARY,
    EXPERIENCES,
    EDUCATIONS,
    SKILLS,
    PROJECTS,
    CERTIFICATES,
}

export type TEditResumeContext = {
    resumeInfo: TResume, resumeInfoDispatch: Dispatch<{
        action: ResumeActions;
        payload: any;
    }>
}

export const EditResumeContext = createContext<TEditResumeContext | undefined>(undefined)

const resumeInfoReducer = (state: TResume, { action, payload }: { action: ResumeActions, payload: any }): TResume => {
    const newState: TResume = structuredClone(state)

    if (action === ResumeActions.PERSONAL_INFO) {
        newState.firstName = payload.firstName
        newState.lastName = payload.lastName
        newState.email = payload.email
        newState.phone = payload.phone
        newState.jobTitle = payload.jobTitle
        newState.address = payload.address
        return newState
    } else if (action === ResumeActions.SUMMARY) {
        newState.summary = payload.summary
        return newState
    } else if (action === ResumeActions.EXPERIENCES) {
        newState.experiences = [...payload.experiences]
        return newState
    } else if (action === ResumeActions.EDUCATIONS) {
        newState.educations = [...payload.educations]
        return newState
    } else if (action === ResumeActions.SKILLS) {
        newState.skills = [...payload.skills]
        return newState
    } else if (action === ResumeActions.PROJECTS) {
        newState.projects = [...payload.projects]
        return newState
    } else if (action === ResumeActions.CERTIFICATES) {
        newState.certificates = [...payload.certificates]
        return newState
    }
    return state
}

export default function EditResumeProvider({ children, resume }: { children: ReactNode, resume: TResume }) {
    const [resumeInfo, resumeInfoDispatch] = useReducer(resumeInfoReducer, resume)
    const value = useMemo(() => ({ resumeInfo, resumeInfoDispatch }), [resumeInfo, resumeInfoDispatch])
    return (
        <EditResumeContext.Provider value={value}>
            {children}
        </EditResumeContext.Provider>
    )
}