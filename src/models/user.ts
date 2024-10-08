export interface User {
    id: number,
    name: string,
    surname: string,
    email: string,
    password: string,
    picture: string,
    friendsIds: number[],
    selectedSports: string[],
    dateOfBirth: string,
    education: string,
    work: string,
    aboutMe: string
}

