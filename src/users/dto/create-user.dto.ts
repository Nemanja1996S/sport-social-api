export class CreateUserDto {

    name: string;
    surname: string;
    email: string;
    password: string;
    picture: string
    selectedSports: string[]
    friendsIds: number[] = []
    dateOfBirth: string
    education?: string
    work?: string
    aboutMe?: string
}



