DROP TABLE IF EXISTS tweets;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tweets (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  tweet_content VARCHAR(256),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users 
  (username) VALUES
  ('Cosme'),
  ('Javi');

INSERT INTO tweets 
  (tweet_content, user_id) VALUES
  ('SCC 2024 had Magnus Carlsen as the winner', 1),
  ('Alireza was second', 1),
  ('Hans was fourth', 2);

-- Sub-select example
SELECT * FROM tweets WHERE user_id = (
  SELECT id FROM users WHERE username = 'Cosme'
);

-- JOIN example
SELECT *
FROM users
JOIN tweets
  ON users.id = tweets.user_id
ORDER BY tweets.tweet_content DESC
LIMIT 2;