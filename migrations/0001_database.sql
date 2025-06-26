-- Migration number: 0001 	 2025-06-24T16:09:29.025Z
DROP TABLE IF EXISTS task;
CREATE TABLE IF NOT EXISTS task (
    Id INTEGER PRIMARY KEY, 
   nama TEXT,
   keterangan TEXT,
   deadline TEXT
    );

INSERT INTO task (
    id, nama, keterangan, deadline) VALUES 
(1, 'tugas pemrograman', 'membuat CRUD', '2025-06-26'), (2, 'IMK', 'membuat makalah', '2025-06-29');

SELECT * FROM  task;
