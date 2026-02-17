/**
 * Validate API key middleware
 */
function validateApiKey(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  
  // For development, skip API key validation
  if (process.env.NODE_ENV === 'development') {
    return next();
  }

  // In production, validate API key
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid or missing API key'
    });
  }

  next();
}

module.exports = validateApiKey;
