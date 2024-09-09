const express = require('express');
const pg = require('pg');
require('dotenv').config(); // To load .env variables

const app = express();
const port = 3000;

// Set up PostgreSQL client
const conString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const client = new pg.Client(conString);

// Connect to PostgreSQL
client.connect()
  .then(() => console.log("Connected to PostgreSQL successfully!"))
  .catch(err => {
    console.error("Connection error", err);
    process.exit(1); // Exit the process if connection fails
  });

// Define a route to show tweets
app.get('/', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM tweets');
    const rows = result.rows;

    // Generate HTML table
    let html = '<h1>Tweets</h1><table border="1"><tr><th>ID</th><th>Tweet Content</th></tr>';
    rows.forEach(row => {
      html += `<tr><td>${row.id}</td><td>${row.tweet_content}</td></tr>`;
    });
    html += '</table>';

    res.send(html);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('An error occurred while fetching data.');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
