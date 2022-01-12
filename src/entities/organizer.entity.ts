
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Event } from "./event.entity";

@Entity({name: "orgaizers"})
export class Organizer {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    name!: string;

    @OneToMany(() => Event, event => event.orgaizer)
    events!: Event[];
}