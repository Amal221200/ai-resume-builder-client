"use server"
import { v4 as uuidV4 } from "uuid"
import axiosClient from "../axiosClient"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { TResume } from "../types"


const ENDPOINT = `/resumes`

export async function getResumes(): Promise<TResume[] | undefined> {
    try {
        const user = await currentUser()

        if (!user) {
            redirect('/auth/sign-in')
        }
        const email = user.emailAddresses[0].emailAddress

        const response = await axiosClient.get(`${ENDPOINT}?filters[user_email][$eq]=${email}&sort[0]=updatedAt:desc`)

        return response.data.data
    } catch (error) {
        console.log(error);

    }
}

export async function getResume(resumeId: string): Promise<TResume | undefined> {
    try {
        const user = await currentUser()

        if (!user) {
            redirect('/auth/sign-in')
        }
        const email = user.emailAddresses[0].emailAddress

        const response = await axiosClient.get(`${ENDPOINT}?filters[user_email][$eq]=${email}&filters[resumeId][$eq]=${resumeId}`)
        return response.data.data[0]
    } catch (error) {
        console.log(error);

    }
}


export async function createResume(title: string): Promise<TResume | undefined> {
    try {
        const id = uuidV4()
        const user = await currentUser()

        if (!user) {
            redirect('/auth/sign-in')
        }

        const response = await axiosClient.post(ENDPOINT, {
            data: {
                resumeId: id,
                title,
                user_email: user.emailAddresses[0].emailAddress,
                username: user.username ?? user.fullName?.toLowerCase().replaceAll(' ', '_')
            }
        })

        revalidatePath('/dashboard')
        return response.data.data
    } catch (error) {
        console.log(error);

    }
}