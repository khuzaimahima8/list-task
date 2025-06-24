// buat tabel task
create table task(
    id INTEGER PRIMARY KEY
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    deadline DATE-TIME NOT NULL,
)