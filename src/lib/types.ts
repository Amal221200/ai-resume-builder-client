export type TResume = {
    id: number,
    attributes: {
        title: string,
        themeColor?: string,
        resumeId: string,
        user_email: string,
        username: string,
        createdAt: string,
        updatedAt: string,
        publishedAt: string,
        firstName?: string,
        lastName?: string,
        phone?: string,
        address?: string,
        email?: string,
        jobTitle?: string,
        summary?: string,
        education?: {
            id: number,
            universityName: string,
            startDate: string,
            endDate: string,
            degree: string,
            major: string,
            description: string,
            currentlyStudying: boolean
        }[],
        skills?: { id: number, name: string, rating: number }[],
        experience?: {
            id: 2,
            title: string,
            companyName: string,
            city: string,
            state: string,
            startDate: string,
            endDate: string,
            currentlyWorking: boolean,
            workSummary: string
        }[]
    },

}
