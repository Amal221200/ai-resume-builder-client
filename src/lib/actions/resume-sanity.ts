"use server"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { revalidatePath, revalidateTag } from "next/cache"
import { sanity } from "../sanity"
import { TResume } from "../types-sanity"
import { v4 as uuidV4 } from "uuid"
import { SanityDocument } from "next-sanity"

export async function getResumes(): Promise<TResume[]> {
    const user = await currentUser()

    if (!user) {
        redirect('/auth/sign-in')
    }

    const email = user.emailAddresses[0].emailAddress
    const response = await sanity.fetch<TResume[]>(`*[_type=="resume" && (user_email==$email || email=="johndoe@example.com")]`, { email }, {
        cache: "force-cache"
    })

    return response
}

export async function getResume(resumeId: string): Promise<TResume> {
    const user = await currentUser()

    if (!user) {
        redirect('/auth/sign-in')
    }

    const response = await sanity.fetch<TResume>(`*[_type=="resume" && _id==$resumeId][0]`, { resumeId }, {
        cache: "no-store"
    })

    return response
}

export async function createResume(title: string): Promise<SanityDocument<TResume>> {
    const user = await currentUser()

    if (!user) {
        redirect('/auth/sign-in')
    }

    const data: TResume = {
        _type: "resume",
        _id: uuidV4(),
        title,
        user_email: user.emailAddresses[0].emailAddress,
        username: user.username ?? user.fullName?.toLowerCase().replaceAll(' ', '_')!,
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        email: "",
        jobTitle: "",
        summary: "",
        links: [],
        educations: [],
        experiences: [],
        projects: [],
        skills: [],
        certificates: []
    }
    const response = await sanity.create<TResume>(data)
    revalidatePath('/dashboard')
    return response
}

export async function updateResume(resume: TResume): Promise<TResume> {
    const user = await currentUser()

    if (!user) {
        redirect('/auth/sign-in')
    }

    const { _id, ...data } = resume
    const response = await sanity.patch(_id).set({ ...data }).commit<TResume>()

    revalidatePath(`/dashboard/resume/${resume._id}`)
    return response
}

export async function deleteResume(resumeId: string): Promise<SanityDocument<TResume>> {
    const user = await currentUser()

    if (!user) {
        redirect('/auth/sign-in')
    }

    const response = await sanity.delete<TResume>(resumeId)
    revalidatePath('/dashboard')
    return response
}
