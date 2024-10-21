import { Comment } from "src/comments/entities/comment.entity";
import { AbstractEntity } from "src/database/abstract.entity";
import { Friend } from "src/friends/entities/friend.entity";
import { Friendship } from "src/friendship/entities/friendship.entity";
import { Post } from "src/posts/entities/post.entity";
import { Request } from "src/requests/entities/request.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users'})
export class User extends AbstractEntity<User>{

    @Column({type: 'text', nullable: false})
    name: string;

    @Column({type: 'text', nullable: false})
    surname: string;

    @Column({nullable: false})
    email: string;

    @Column({type: 'text', nullable: false})
    password: string;

    @Column({type: 'text', nullable: false})
    picture: string;

    @OneToMany(() => Friendship, (friendship) => friendship.user)
    friendships: Friendship[]

    @OneToMany(() => Post, post => post.user)
    posts: Post[]

    @OneToMany(() => Request, request => request.toUser)
    requests: Request[]

    @OneToMany(() => Comment, comment => comment.user)
    comments: Comment[]

    @Column('simple-array')
    selectedSports: string[];

    @OneToMany(() => Request, request => request.fromUser)
    request: Request

    @Column({type: 'text', nullable: false})
    dateOfBirth: string;

    @Column({type: 'text', nullable: true})
    education: string

    @Column({type: 'text', nullable: true})
    work: string

    @Column({type: 'text', nullable: true})
    aboutMe: string
}