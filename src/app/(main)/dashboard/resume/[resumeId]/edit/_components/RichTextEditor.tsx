"use client"

import AIButton from '@/components/buttons/AIButton'
import { cn } from '@/lib/utils'
import React, { use, useCallback } from 'react'
import { Editor, EditorProvider, Toolbar, BtnBold, BtnItalic, BtnUnderline, BtnStrikeThrough, Separator, BtnNumberedList, BtnBulletList, BtnLink } from "react-simple-wysiwyg"
import { EditResumeContext, TEditResumeContext } from './providers/EditResumeProvider'
import { generateAIWorkSummary } from '@/lib/actions/gemini_ai'

const PROMPT = 'position titile: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experince level and No JSON array) , give me result in HTML tags'

const RichTextEditor = ({ name, onInput, value, className, index, loading, setLoading, label }: { index: number, label?: string, name: string, value: string, className?: string, onInput: (name: string, value: string) => void, loading: boolean, setLoading: (val: boolean) => void }) => {
    const { resumeInfo } = use(EditResumeContext) as TEditResumeContext

    const onGenerate = useCallback(async () => {
        setLoading(true)
        const response = await generateAIWorkSummary(PROMPT.replace('{positionTitle}', resumeInfo.attributes?.experience?.[index]?.title || ''))
        onInput(name, response)
        setLoading(false)
    }, [onInput, name, index, resumeInfo, setLoading])

    return (
        <EditorProvider>
            <div className='my-3 flex items-end justify-between'>
                <label>{label || ""}</label>
                <AIButton onClick={onGenerate} disabled={!resumeInfo.attributes?.experience?.[index]?.title || loading}>
                    Generate from AI
                </AIButton>
            </div>
            <Editor value={value} name={name} className={cn("", className)} onChange={(e) => { onInput(e.target.name!, e.target.value) }}>
                <Toolbar>
                    <BtnBold />
                    <BtnItalic />
                    <BtnUnderline />
                    <BtnStrikeThrough />
                    <Separator />
                    <BtnNumberedList />
                    <BtnBulletList />
                    <Separator />
                    <BtnLink />
                </Toolbar>
            </Editor>
        </EditorProvider>
    )
}

export default RichTextEditor