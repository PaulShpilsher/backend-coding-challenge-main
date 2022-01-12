import { getRepository } from "typeorm"
import { Event } from "../entities/event.entity"
import { Organizer } from "../entities/organizer.entity";
import { getConnection } from "./connection";



export const readEvent = async (id: number): Promise<Event | undefined> => {
    const connection = await getConnection();
    const repository = connection.getRepository(Event);
    const x = await repository
        .createQueryBuilder("e")
        .innerJoinAndSelect("e.organizer", "organizer")
        .andWhereInIds([id])
        .getOne();
    return x;
}