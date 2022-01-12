CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    isOutside INTEGER DEFAULT 0,
    location TEXT,
    date INTEGER
);

CREATE TABLE IF NOT EXISTS organizers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS events_organizers (
    event_id INTEGER,
    organizer_id INTEGER,
    FOREIGN KEY(event_id) REFERENCES event(id),
    FOREIGN KEY(organizer_id) REFERENCES organizers(id)
    );