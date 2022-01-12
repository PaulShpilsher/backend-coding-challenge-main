import path from "path";
import { Connection, ConnectionOptions , createConnection} from "typeorm";
import { Event } from "../entities/event.entity";
import { Organizer } from "../entities/organizer.entity";

const options: ConnectionOptions = {
    type: "sqlite",
    database: path.resolve(__dirname, "../../data/myDb.db"),
    entities: [ Organizer, Event ],
    logging: true
};

let db: Connection;

export const getDbConnection = async () => {
    if(!db) {
        db = await createConnection(options);
    }
    return db;
}