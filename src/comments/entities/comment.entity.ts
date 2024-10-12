import { AbstractEntity } from "src/database/abstract.entity";
import { Post } from "src/posts/entities/post.entity";
import { Entity, ManyToOne, Column } from "typeorm";

@Entity({name: 'comments'})
export class Comment extends AbstractEntity<Comment>{
    @ManyToOne(() => Post, (post) => post.comments, {cascade: true})
    post: Post

    @Column({nullable: false})
    userId: number
    
    @Column({nullable: false})
    commentDate: string

    @Column({nullable: true})
    commentText: string

    @Column({nullable: true})
    commentPic: string
}
