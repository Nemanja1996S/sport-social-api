import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    name?: string;
    surname?: string;
    email?: string;
    password?: string;
    picture?: string
    selectedSports?: string[]
    friendsIds?: number[]
    dateOfBirth?: string
    education?: string
    work?: string
    aboutMe?: string
}
