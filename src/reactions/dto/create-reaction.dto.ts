import { Post } from "src/posts/entities/post.entity"

export class CreateReactionDto {
    userId: number
    reactionEnum: ReactionEnum
}


export enum ReactionEnum {        
    "dislike" = -1,
    "neutral" = 0,
    "like" = 1
}