import { CreateFriendDto } from "src/friends/dto/create-friend.dto";
import { CreatePostDto } from "src/posts/dto/create-post.dto";
import { CreateRequestDto } from "src/requests/dto/create-request.dto";

export class CreateUserDto {
    name: string;
    surname: string;
    email: string;
    password: string;
    picture: string
    selectedSports: string[]
    friends?: CreateFriendDto[]
    requests?: CreateRequestDto[]
    posts?: CreatePostDto[]
    dateOfBirth: string
    education?: string
    work?: string
    aboutMe?: string
}



