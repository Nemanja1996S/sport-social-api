export class CreatePostDto {

    // userFullname: string
    // userImage: string
    userId: number
    forSports: string[]
    date: string
    text?: string
    image?: string
    numberOfLikes: number = 0
    // usersReactions : UserReaction[]
    numberOfDislikes: number = 0
    numberOfComments: number = 0
}
