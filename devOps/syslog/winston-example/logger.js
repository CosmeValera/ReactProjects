const winston = require('winston');
const path = require('path');
const fs = require('fs');

// Ensure logs directory exists
if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}

// Define log format -> 2025-11-14 14:21:11 [info]: User login
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.printf(({ timestamp, level, message, stack }) => {
    return `${timestamp} [${level}]: ${stack || message}`;
  })
);

// Create the logger with transports.
// i.e: the logs will be written to the console and the files 'logs/combined.log' and 'logs/error.log'.
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  transports: [
    // Write all logs to console
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        logFormat
      )
    }),
    // Write all logs with level 'error' to error.log
    new winston.transports.File({
      filename: path.join('logs', 'error.log'),
      level: 'error'
    }),
    // Write all logs to combined.log
    new winston.transports.File({
      filename: path.join('logs', 'combined.log')
    })
  ]
});

// Handle uncaught exceptions gracefully
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  // Give Winston time to write logs
  setTimeout(() => {
    process.exit(1);
  }, 1000);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  setTimeout(() => {
    process.exit(1);
  }, 1000);
});

module.exports = logger;