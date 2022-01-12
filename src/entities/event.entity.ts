
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Organizer } from "./organizer.entity";

@Entity({name: "events"})
export class Event {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    name!: string;

    @Column({default: false})
    isOutside!: boolean;
    
    @Column()
    location!: string;
    
    @Column()
    date!: number;
    
    @ManyToOne(() => Organizer, orgaizer => orgaizer.events)
    orgaizer!: Organizer;
}
