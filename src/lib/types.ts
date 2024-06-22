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
        educations: Array<TEducation>,
        skills: Array<TSkill>,
        experiences: Array<TExperience>,
        projects: Array<TProject>,
        certificates: Array<TCertificate>,
    },

}

export type TProject = {
    [index: string]: unknown,
    id?: number,
    title: string,
    link: string,
    stack: string,
    description: string
}

export type TCertificate = {
    [index: string]: unknown,
    id?: number,
    title: string,
    link: string,
    provider: string,
    description: string
}

export type TSkill = {
    [index: string]: unknown,
    id?: number,
    name: string,
}

export type TEducation = {
    [index: string]: unknown,
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
    [index: string]: unknown,
    id?: number,
    title: string,
    companyName: string,
    city: string,
    state: string,
    startDate: string,
    endDate: string,
    skills: string,
    currentlyWorking: boolean,
    workSummary: string
}