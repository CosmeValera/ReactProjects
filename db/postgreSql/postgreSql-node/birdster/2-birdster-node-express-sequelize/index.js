const express = require('express');
require('dotenv').config();

const app = express();
const port = 3000;

// Import the Sequelize instance and models
const sequelize = require('./config/db');
const User = require('./models/User');
const Tweet = require('./models/Tweet');

// Sync all models with the database
sequelize.sync({ force: false }) // `force: true` drops tables if they already exist (not recommended in production)
  .then(() => console.log("Database & tables created!"))
  .catch(err => console.error('Error creating database:', err));

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Define a route to show tweets
app.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    const tweets = await Tweet.findAll({ include: User });

    const cosme = await User.findOne({ where: { username: 'Cosme' } });
    const tweetsFromCosme = await Tweet.findAll({
      include: User,
      where: { user_id: cosme.id }
    });

    // Define table data in an array of objects
    const tables = [
      { title: 'Users', data: users, columns: ['ID', 'Username', 'Created At'], fields: ['id', 'username', 'createdAt'] },
      { title: 'Tweets', data: tweets, columns: ['User ID', 'ID', 'Tweet Content', 'Created At'], fields: ['user_id', 'id', 'tweetContent',  'createdAt'] },
      { title: "Tweets from Cosme", data: tweetsFromCosme, columns: ['User ID', 'ID', 'Tweet Content', 'Created At'], fields: ['user_id', 'id', 'tweetContent',  'createdAt'] }
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
