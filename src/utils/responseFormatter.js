/**
 * Format error response
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code
 * @returns {Object} - Formatted error object
 */
function formatError(message, statusCode = 500) {
  return {
    error: true,
    statusCode,
    message,
    timestamp: new Date().toISOString()
  };
}

/**
 * Format success response
 * @param {*} data - Response data
 * @param {string} message - Success message
 * @returns {Object} - Formatted success object
 */
function formatSuccess(data, message = 'Success') {
  return {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  };
}

module.exports = {
  formatError,
  formatSuccess
};
