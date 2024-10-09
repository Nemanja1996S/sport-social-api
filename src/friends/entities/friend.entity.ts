import { AbstractEntity } from "src/database/abstract.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'friends'})
export class Friend extends AbstractEntity<Friend>{
    
    @ManyToOne(() => User, (user) => user.friends, {cascade: true})
    user: User

    @Column({nullable: true})
    friendId: string

}