
import { Request, Response, NextFunction } from 'express';
import { Event } from '../entities/event.entity';
import { readEvent, readEvents } from '../repositories/event.repository';

const isNumeric = (value: string)=> /^-?\d+$/.test(value);
const parseDate = (value: string): number => isNumeric(value) ? Number.parseInt(value) : Date.parse(value);

// GET /events
// query parameters:
// - `from`: optional, Date, defaults ot the current time, only return events after this date
// - `until`: optional, Date, if omitted return all future events
export const getEvents = async (req: Request, res: Response) => {

    /// TODO: Perform better validation
    let from: number = parseDate(req.query.from as string);
    if(isNaN(from)) {
        from = Date.now();
    }

    const until: number = parseDate(req.query.until as string);
    // console.log('from: %d', from);
    // console.log('until: %d', until);

    const events: Event[] = await readEvents(from, until);

    return res.status(200).json(events);

}


// GET /events/{eventId}
export const getEvent  = async (req: Request, res: Response) => {
    if(!isNumeric(req.params.id)) {
        return res.status(400).json({
            status: "fail",
            message: `Invalid id: ${req.params.id}`
        });
    }
    
    const eventId = Number.parseInt(req.params.id);
    const event = await readEvent(eventId);
    if(!event) {
        return res.status(404).json({
            status: "fail",
            message: `Event with ID ${eventId} not found`
        });
 
    }
    
    return res.status(200).json(event);

}