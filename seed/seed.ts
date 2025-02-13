import fs from 'fs';
import path from 'path';


// Define your seed data
const seedData = {

  habits: [
    { id: 1, name: 'Morning Exercise', fromTime: '06:00', toTime: '07:00', createdBy: 'johndoe', createdAt: '2024-02-10' },
    { id: 2, name: 'Reading', fromTime: '20:00', toTime: '21:00', createdBy: 'janesmith', createdAt: '2024-02-11' },
  ],
  token: [
    { id: 1, token: 'abc123', expirationDateUTC: '2024-12-31', username: 'johndoe', userId: 1 },
    { id: 2, token: 'xyz789', expirationDateUTC: '2024-12-31', username: 'janesmith', userId: 2 },
  ],
  transactions: [
    { id: 1, habitsId: 1, doneAt: '2024-02-10T07:00:00Z', createdAt: '2024-02-10T06:00:00Z', assignTo: 'johndoe' },
    { id: 2, habitsId: 2, doneAt: '2024-02-11T21:00:00Z', createdAt: '2024-02-11T20:00:00Z', assignTo: 'janesmith' },
  ],
};

// Convert data to SQL INSERT statements
const sqlStatements = [

  'DELETE FROM habits;',
  `INSERT INTO habits (id, name, from_time, to_time, created_by, created_at) VALUES ${seedData.habits
    .map((h) => `(${h.id}, '${h.name}', '${h.fromTime}', '${h.toTime}', '${h.createdBy}', '${h.createdAt}')`)
    .join(', ')};`,

  'DELETE FROM token;',
  `INSERT INTO token (id, token, expiration_date_utc, username, user_id) VALUES ${seedData.token
    .map((t) => `(${t.id}, '${t.token}', '${t.expirationDateUTC}', '${t.username}', ${t.userId})`)
    .join(', ')};`,

  'DELETE FROM transactions;',
  `INSERT INTO transactions (id, habits_id, done_at, created_at, assign_to) VALUES ${seedData.transactions
    .map((t) => `(${t.id}, ${t.habitsId}, '${t.doneAt}', '${t.createdAt}', '${t.assignTo}')`)
    .join(', ')};`,
].join('\n');

// Write to a seed.sql file
const filePath = path.join(__dirname, 'seed.sql');
fs.writeFileSync(filePath, sqlStatements);

console.log(`✅ Seed file generated: ${filePath}`);
console.log('Run `wrangler d1 execute habittracker --local --file db/seed.sql` to seed the database.');