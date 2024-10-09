import { AbstractEntity } from "src/database/abstract.entity"
import { Post } from "src/posts/entities/post.entity"
import { Entity, ManyToOne, Column } from "typeorm"
import { ReactionEnum } from "../dto/create-reaction.dto"

@Entity({name: 'reactions'})
export class Reaction extends AbstractEntity<Reaction>{
    
    @ManyToOne(() => Post, (post) => post.usersReactions, {cascade: true})
    post: Post

    @Column({nullable: false})
    userId: string

    @Column({type: 'enum', enum: ReactionEnum, default: ReactionEnum.neutral})
    reactionEnum: ReactionEnum

}