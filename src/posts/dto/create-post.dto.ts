import { CreateReactionDto } from "src/reactions/dto/create-reaction.dto"
import { Reaction } from "src/reactions/entities/reaction.entity"

export class CreatePostDto {

    // userFullname: string
    // userImage: string
    // userId: string;
    forSports: string[]
    date: string
    text?: string
    image?: string
    numberOfLikes: number = 0
    usersReactions? : CreateReactionDto[] 
    numberOfDislikes: number = 0
    numberOfComments: number = 0
}
