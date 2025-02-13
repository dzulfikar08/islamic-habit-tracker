DELETE FROM users;
INSERT INTO users (id, name, username, password_hashed) VALUES (1, 'John Doe', 'johndoe', '$2a$10$pUwBZekLLlsuNafSn.ArlecojDr16fJXc5TEZJs5V03dEIuCOC1Sq'), (2, 'Jane Smith', 'janesmith', '$2a$10$pUwBZekLLlsuNafSn.ArlecojDr16fJXc5TEZJs5V03dEIuCOC1Sq');
DELETE FROM habits;
INSERT INTO habits (id, name, from_time, to_time, created_by, created_at) VALUES (1, 'Morning Exercise', '06:00', '07:00', 'johndoe', '2024-02-10'), (2, 'Reading', '20:00', '21:00', 'janesmith', '2024-02-11');
DELETE FROM token;
INSERT INTO token (id, token, expiration_date_utc, username, user_id) VALUES (1, 'abc123', '2024-12-31', 'johndoe', 1), (2, 'xyz789', '2024-12-31', 'janesmith', 2);
DELETE FROM transactions;
INSERT INTO transactions (id, habits_id, done_at, created_at, assign_to) VALUES (1, 1, '2024-02-10T07:00:00Z', '2024-02-10T06:00:00Z', 'johndoe'), (2, 2, '2024-02-11T21:00:00Z', '2024-02-11T20:00:00Z', 'janesmith');