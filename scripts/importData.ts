import { assert } from "console";
import { readFileSync, stat } from "fs";
import { join } from "path";
import { Database } from "sqlite3";
import { promisify } from "util";

interface Organizer {
    name: string
}

interface Event {
    name: string,
    isOutside: boolean,
    location: string,
    date: number,
    organizer: Organizer
}

const importData = () => {
    // Import the data in json format and save in database
    const events: Event[] = loadEvents();

    const dbLocation = join(__dirname, '../data/myDb.db')
    const sqlite3 = require('sqlite3').verbose();
    const db: Database = new sqlite3.Database(dbLocation, err => {
        if (err) {
          return console.error(err.message);
        }
    });

    try {
        createDbSchema(db);
        
        insertEvents(db, events);
    } finally {
        db.close(err => {
            if (err) {
              return console.error(err.message);
            }
        });
    }


}

const readFile = (relativeFilePath: string): string => {
    const filePath = join(__dirname, relativeFilePath);
    return readFileSync(filePath, "utf-8");
}

const getSqlStatements = (): string[] => {
    const dataSql = readFile("../data/tables.sql");
    const statements = dataSql.toString().split(");");
    return statements.map(x=>x.trim()).filter(x=>!!x).map(x=>x+");");
}

const createDbSchema = (db: Database): void => {
    const sqlStatements: string[] = getSqlStatements();
    if(!sqlStatements) {
        throw new Error("No SQL stetesment found")
    }
    db.serialize(() => {
        db.run("BEGIN TRANSACTION;");

        sqlStatements.forEach((sql) => {
            console.log(sql);
            db.run(sql, err => {
                if (err) {
                    throw err;
                    }
                });
            });
        
        db.run("COMMIT;");
    });
}

const loadEvents = (): Event[] => {
    const s: string = readFile("../data/data.json");
    return JSON.parse(s);
}


const insertEvents = (db: Database, events: Event[]) => {

    db.serialize(() => {
        events.forEach((event: Event) => {
            db.run(
                "INSERT INTO organizers(name) VALUES(?)",
                [event.organizer.name], 
                function(err) {
                    //ignore
                });

            let organizerId;
            db.get(
                "SELECT id FROM organizers WHERE name = ?",
                [event.organizer.name], 
                (err, row) => {
                    if (err) {
                        throw err;
                    }            
                    
                    console.log( row.id, row.name);
                    organizerId = row.id;
                });

            db.run(
                `INSERT INTO EVENTS(name, isOutside, location, date, organizer_id)
                VALUES(?,?,?,?,?)`,
                [event.name, event.isOutside, event.location, event.date, organizerId],
                function(err) {
                    if(err) {
                        throw err;
                    }
                });
            });
        });
}

importData();
