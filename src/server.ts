import express from "express"
import {Server} from "http";
import { getEvent, getEvents } from "./controllers/events.controller";
import "reflect-metadata";

const sleep = (ms: number): Promise<void> => new Promise((res) => setTimeout(res, ms))

export const start = async (): Promise<Server> => new Promise(async (resolve, reject) => {
    try {
        const port = 4040
        const app = express()
        //getDBConnection();

        const router = express.Router();
        app.use(router);

        router.get('/', (req, res) => {
            res.send('Hello World!')
        });
        
        router.get("/events", getEvents);
        router.get("/event/:id", getEvent);

        const server = app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
            resolve(server)
        })
    } catch (err) {
        reject(err)
    }
})
