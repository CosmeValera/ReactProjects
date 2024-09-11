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
