import { Comment } from "src/comments/entities/comment.entity";
import { AbstractEntity } from "src/database/abstract.entity";
import { Reaction } from "src/reactions/entities/reaction.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'posts'})
export class Post extends AbstractEntity<Post>{

    @ManyToOne(() => User, (user) => user.posts, {cascade: true})
    user: User

    @OneToMany(() => Reaction, (reaction) => reaction.post)
    usersReactions: Reaction[]

    @OneToMany(() => Comment, (comment) => comment.post)
    comments: Comment[]

    @Column('simple-array')
    forSports: string[];

    @Column({type: 'text', nullable: false})
    date: string;

    @Column({type: 'text', nullable: true})
    text: string;

    @Column({type: 'text', nullable: true})
    image: string;

    @Column({nullable: true})
    numberOfLikes: number

    @Column({nullable: true})
    numberOfDislikes: number

    @Column({nullable: true})
    numberOfComments: number

    
}