export type PersonType = {
    userId: number
    fullName: number
    aboutMe: string | null
    photos: {
        small: string | null
        large: string | null
    }
    contacts: {
        facebook: string | null
        website: string | null
        vk: string | null
        twitter: string | null
        instagram: string | null
        youtube: string | null
        githab: string | null
        mainLink: string | null
    }
}