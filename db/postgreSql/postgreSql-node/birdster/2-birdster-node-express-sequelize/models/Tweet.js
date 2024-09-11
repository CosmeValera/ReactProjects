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
