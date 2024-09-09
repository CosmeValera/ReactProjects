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

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
