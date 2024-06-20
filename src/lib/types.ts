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
        education: Array<TEducation>,
        skills: Array<TSkill>,
        experience: Array<TExperience>
    },

}

export type TSkill = {
    [index: string]: any,
    id?: number,
    name: string,
    rating: number
}

export type TEducation = {
    [index: string]: any,
    id?: number,
    universityName: string,
    startDate: string,
    endDate: string,
    degree: string,
    major: string,
    description: string,
    currentlyStudying: boolean
}

export type TExperience = {
    [index: string]: any,
    id?: number,
    title: string,
    companyName: string,
    city: string,
    state: string,
    startDate: string,
    endDate: string,
    currentlyWorking: boolean,
    workSummary: string
}