import { getRepository } from "typeorm"
import { Event } from "../entities/event.entity"
import { Organizer } from "../entities/organizer.entity";
import { getConnection } from "./connection";



export const readEvent = async (id: number): Promise<Event | undefined> => {
    const connection = await getConnection();
    const repository = connection.getRepository(Event);
    const x = await repository
        .createQueryBuilder("event")
        .innerJoinAndSelect("event.organizer", "organizer")
        .where("event.id = :id", {id})
        .getOne();
    return x;
}