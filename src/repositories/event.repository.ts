import { Event } from "../entities/event.entity"
import { getDbConnection } from "./connection";



export const readEvent = async (id: number): Promise<Event | undefined> => {
    const connection = await getDbConnection();
    const repository = connection.getRepository(Event);
    return await repository
        .createQueryBuilder("event")
        .innerJoinAndSelect("event.organizer", "organizer")
        .where("event.id = :id", {id})
        .getOne();
}

export const readEvents = async (from: number, until: number): Promise<Event[]> => {
    const connection = await getDbConnection();
    const repository = connection.getRepository(Event);
    let query = await repository
        .createQueryBuilder("event")
        .innerJoinAndSelect("event.organizer", "organizer")
        .where("event.date >= :from", {from});

    if(!!until) {
        query = query
            .andWhere("event.date < :until", {until});
    }

    return query.getMany();
}

