import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'sports'})
export class Sport {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('simple-array')
    allSports: string[]

}
