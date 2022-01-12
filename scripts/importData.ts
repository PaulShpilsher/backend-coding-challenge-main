import { readFileSync, stat } from "fs";
import { join } from "path";
import { Database } from "sqlite3";

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

export const importData = () => {
    // Import the data in json format and save in database
    const dbLocation = join(__dirname, '../data/myDb.db')
    const sqlite3 = require('sqlite3').verbose();
    const db: Database = new sqlite3.Database(dbLocation, err => {
        if (err) {
          return console.error(err.message);
        }
    });

    try {
        createDbSchema(db);
    } finally {
        db.close(err => {
            if (err) {
              return console.error(err.message);
            }
        });
    }

}


const getSqlStatements = (): string[] => {
    const sqlDataLocation = join(__dirname, "../data/tables.sql");
    const dataSql = readFileSync(sqlDataLocation).toString();
    const statements = dataSql.toString().split(");");
    return statements.map(x=>x.trim()).filter(x=>!!x).map(x=>x+");");
}

const createDbSchema = (db: Database): void => {
    const sqlStatements: string[] = getSqlStatements();
    if(!sqlStatements) {
        throw new Error("No SQL stetesment found")
    }
    // db.run(sqlStatements[0], err => {
    //     if (err) {
    //         throw err;
    //         }
    //     });

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

importData();
