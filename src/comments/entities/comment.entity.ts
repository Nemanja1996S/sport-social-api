import { AbstractEntity } from "src/database/abstract.entity";
import { Post } from "src/posts/entities/post.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, ManyToOne, Column, JoinColumn, OneToOne } from "typeorm";

@Entity({name: 'comments'})
export class Comment extends AbstractEntity<Comment>{
    @ManyToOne(() => Post, (post) => post.comments, {cascade: true})
    post: Post

    @ManyToOne(() => User, (user) => user.comments, {cascade: true})
    @JoinColumn()
    user: User
    
    @Column({nullable: false})
    commentDate: string

    @Column({nullable: true})
    commentText?: string

    @Column({nullable: true})
    commentPic?: string
}
