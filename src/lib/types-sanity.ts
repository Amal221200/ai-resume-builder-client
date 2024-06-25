export type TResume = {
    _type: "resume",
    _id: string,
    title: string,
    user_email: string,
    username: string,
    createdAt?: string,
    updatedAt?: string,
    publishedAt?: string,
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
    certificates: Array<TCertificate>
}

export type TProject = {
    [index: string]: unknown,
    _key?: string,
    _type:"project",
    title: string,
    link: string,
    stack: string,
    description: string
}

export type TCertificate = {
    [index: string]: unknown,
    _type:"certificate",
    _key?: string,
    title: string,
    link: string,
    provider: string,
    description: string
}

export type TSkill = {
    [index: string]: unknown,
    _type:"skill",
    _key?: string,
    name: string,
}

export type TEducation = {
    [index: string]: unknown,
    _key?: string,
    _type?: "education",
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
    _type:"experience",
    _key?: string,
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