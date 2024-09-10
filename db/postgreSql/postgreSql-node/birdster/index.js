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

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Define a route to show tweets
app.get('/', async (req, res) => {
  try {
    const tweetsResults = await client.query("SELECT * FROM tweets");
    const usersResults = await client.query("SELECT * FROM users");
    const tweetsFromCosme = await client.query("SELECT * FROM tweets WHERE user_id = (SELECT id FROM users WHERE username = 'Cosme')");

    // Define table data in an array of objects
    const tables = [
      { title: 'Users', data: usersResults.rows, columns: ['ID', 'Username', 'Created At'], fields: ['id', 'username', 'created_at'] },
      { title: 'Tweets', data: tweetsResults.rows, columns: ['User ID', 'ID', 'Tweet Content', 'Created At'], fields: ['user_id', 'id', 'tweet_content',  'created_at'] },
      { title: "Tweets from Cosme", data: tweetsFromCosme.rows, columns: ['User ID', 'ID', 'Tweet Content', 'Created At'], fields: ['user_id', 'id', 'tweet_content',  'created_at'] }
    ];

    // Generate HTML for each table
    let html = '<body style="background: #252525; color: #F6F6F6;">';
    tables.forEach(table => {
      html += `<h1>${table.title}</h1><table border="1" style="color: #F6F6F6;"><tr>`;
      table.columns.forEach(column => {
        html += `<th>${column}</th>`;
      });
      html += `</tr>`;
      table.data.forEach(row => {
        html += `<tr>`;
        table.fields.forEach(field => {
          html += `<td>${row[field]}</td>`;
        });
        html += `</tr>`;
      });
      html += `</table>`;
    });

    html += '</body>';
    res.send(html);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('An error occurred while fetching data.');
  }
});
