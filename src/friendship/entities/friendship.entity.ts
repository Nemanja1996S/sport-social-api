import { AbstractEntity } from "src/database/abstract.entity";
import { Friend } from "src/friends/entities/friend.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, ManyToOne } from "typeorm";

@Entity({name: 'friendships'})
export class Friendship extends AbstractEntity<Friendship>{
    
    @ManyToOne(() => User, (user) => user.friendships, {cascade: true})
    user: User

    @ManyToOne(() => Friend, (friend) => friend.friendships, {cascade: true})
    friend: Friend

}
