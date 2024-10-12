import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
    // userId: number
    // forSports: string[]
    // date: string
    text?: string
    image?: string
    // numberOfLikes?: number
    // usersReactions : UserReaction[]
    // numberOfDislikes?: number
    // numberOfComments?: number
}
