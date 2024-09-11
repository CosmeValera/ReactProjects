# 🐍 SEQUELIZE

## ⚙️ Create config and models
1. `db.js` (config):
```js
const { Sequelize } = require('sequelize');

// Load environment variables from .env file
require('dotenv').config();

// Create a new Sequelize instance
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  logging: false, // Disable logging; default: console.log
});

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connected to the database with Sequelize successfully!');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
```

2. Models:
   1. User:
```js
const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defatultValue: DataTypes.NOW,
    field: 'created_at'
  },
 }, {
  tableName: 'users',
  timestamps: false
})

module.exports = User;
```

   2. Tweet:
```js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Tweet = sequelize.define('Tweet', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tweetContent: {
    type: DataTypes.STRING(256),
    field: 'tweet_content', // to match the SQL naming convention
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'created_at', // to match the SQL naming convention
  },
}, {
  tableName: 'tweets',
  timestamps: false,
});

// Define associations
User.hasMany(Tweet, {foreignKey: 'user_id'})
Tweet.belongsTo(User, {foreignKey: 'user_id'})

module.exports = Tweet;
```

## 🔄 Connect using Sequelize
```js
const express = require('express');
require('dotenv').config();

const app = express();
const port = 3000;

// Import the Sequelize instance and models
const sequelize = require('./config/db');
const User = require('./models/User');
const Tweet = require('./models/Tweet');

// Sync all models with the database
sequelize.sync({ force: false })
  .then(() => console.log("Database & tables created!"))
  .catch(err => console.error('Error creating database:', err));

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Define a route to show tweets
app.get('/', async (req, res) => {
  ...
});
```