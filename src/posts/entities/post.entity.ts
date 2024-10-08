import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'posts'})
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.posts)
    user: User

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