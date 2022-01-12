CREATE TABLE IF NOT EXISTS organizers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    isOutside INTEGER NOT NULL DEFAULT 0,
    location TEXT NOT NULL,
    date INTEGER NOT NULL,
    organizer_id INTEGER NOT NULL,
    FOREIGN KEY(organizer_id) REFERENCES organizers(id)
);
