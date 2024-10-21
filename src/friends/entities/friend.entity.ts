import { AbstractEntity } from "src/database/abstract.entity";
import { Friendship } from "src/friendship/entities/friendship.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'friends'})
export class Friend {

    @PrimaryColumn()
    id: number;

    @OneToMany(() => Friendship, (friendship) => friendship.friend)
    friendships: Friendship[]
}