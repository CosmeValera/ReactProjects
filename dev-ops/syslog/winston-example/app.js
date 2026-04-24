const logger = require('./logger');

// Example usage
logger.info('Application started');
logger.warn('This is a warning message');
logger.error('This is an error message');

// Log with metadata
logger.info('User login', { userId: 123, username: 'john_doe' });

// Example function with error handling - BETTER APPROACH
function divideNumbers(a, b) {
  if (b === 0) {
    logger.error(`Cannot divide ${a} by zero`);
    return null;
  }
  const result = a / b;
  logger.info(`Division result: ${a} / ${b} = ${result}`);
  return result;
}

// Test cases
divideNumbers(10, 2);  // Works fine
divideNumbers(10, 0);  // Logs error but continues gracefully

logger.info('Application completed successfully');