import { AbstractEntity } from "src/database/abstract.entity";
import { Friend } from "src/friends/entities/friend.entity";
import { Post } from "src/posts/entities/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(() => Friend, friend => friend.user)
    friends: Friend[];

    @OneToMany(() => Post, post => post.user)
    posts: Post[]
    // @Column('simple-array')
    // friendsIds: number[];

    @Column('simple-array')
    selectedSports: string[];

    @Column({type: 'int', nullable: true})
    friendsIds: number[];

    @Column({type: 'text', nullable: false})
    dateOfBirth: string;

    @Column({type: 'text', nullable: true})
    education: string

    @Column({type: 'text', nullable: true})
    work: string

    @Column({type: 'text', nullable: true})
    aboutMe: string
    
}