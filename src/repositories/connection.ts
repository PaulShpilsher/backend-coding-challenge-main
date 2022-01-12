import path from "path";
import { ConnectionOptions , createConnection} from "typeorm";
import { Event } from "../entities/event.entity";
import { Organizer } from "../entities/organizer.entity";

const options: ConnectionOptions = {
    type: "sqlite",
    database: path.resolve(__dirname, "../../data/myDb.db'"),
    entities: [ Organizer, Event ],
    logging: true
};


export const getConnection = async () => await createConnection(options);