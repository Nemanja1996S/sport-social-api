import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'friends'})
export class Friend {

    @PrimaryGeneratedColumn()
    id: number;

    
    @ManyToOne(() => User, (user) => user.friends)
    user: User

}