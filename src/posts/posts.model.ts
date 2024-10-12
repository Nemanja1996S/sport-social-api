export interface PostModel {
    id: number
    user: MiniUser,
    forSports: string[],
    date: string,
    text?: string,
    image?: string,
    numberOfLikes: number,
    usersReactions : UserReaction[]
    numberOfDislikes: number,
    numberOfComments: number
}

export interface UserReaction{
    userId: number,
    reactionEnum: number
    // reactions: ReactionEnum[]
}

export interface MiniUser{
    id: number,
    name: string,
    surname: string,
    picture: string
}