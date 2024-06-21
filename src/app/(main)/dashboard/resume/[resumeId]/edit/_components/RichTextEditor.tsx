"use client"

import AIButton from '@/components/buttons/AIButton'
import { cn } from '@/lib/utils'
import { useCallback } from 'react'
import { Editor, EditorProvider, Toolbar, BtnBold, BtnItalic, BtnUnderline, BtnStrikeThrough, Separator, BtnNumberedList, BtnBulletList, BtnLink } from "react-simple-wysiwyg"
import { generateAIWorkSummary } from '@/lib/actions/gemini_ai'

interface RichTextEditorProps {
    label?: string,
    name: string,
    value: string,
    className?: string,
    onInput: (name: string, value: string) => void,
    loading: boolean,
    setLoading: (val: boolean) => void,
    prompt?: string,
    enable: boolean
}

const PROMPT = 'Write a few lines of description'

const RichTextEditor = ({ name, onInput, value, className, prompt, loading, setLoading, label, enable }: RichTextEditorProps) => {

    const onGenerate = useCallback(async () => {
        setLoading(true)
        const response = await generateAIWorkSummary(prompt || PROMPT)
        onInput(name, response)
        setLoading(false)
    }, [onInput, name, setLoading, prompt])

    return (
        <EditorProvider >
            <div className='my-3 flex flex-col gap-y-2 sx:flex-row sx:items-center sx:justify-between'>
                <label className='text-sm'>{label || ""}</label>
                <AIButton onClick={onGenerate} className='ml-auto' disabled={!enable || loading}>
                    Generate from AI
                </AIButton>
            </div>
            <Editor value={enable ? value : "Please enter the required fields to enable AI"} name={name} className={cn("", !enable && "dim", className)} onChange={(e) => {
                if (!enable) {
                    return
                }
                onInput(e.target.name!, e.target.value)
            }}>
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