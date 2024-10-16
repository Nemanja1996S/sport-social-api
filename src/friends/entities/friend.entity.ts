import { AbstractEntity } from "src/database/abstract.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'friends'})
export class Friend extends AbstractEntity<Friend>{
    
    @ManyToMany(() => User, (user) => user.friends, {cascade: true})
    @JoinTable()
    users: User[]

}