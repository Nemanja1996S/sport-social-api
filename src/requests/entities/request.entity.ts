import { AbstractEntity } from "src/database/abstract.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";

@Entity({name: 'requests'})
export class Request extends AbstractEntity<Request>{
    
    @ManyToOne(() => User, (user) => user.requests, {cascade: true})
    toUser: User

    @ManyToOne(() => User, (user) => user.request, {cascade: true})
    fromUser: User
}