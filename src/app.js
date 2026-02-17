require('dotenv').config();
const express = require('express');
const cors = require('cors');
const chatRoutes = require('./routes/chat');
const config = require('./config/config');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to ChatGPT API Service',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      chat: '/api/chat'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

app.use('/api', chatRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested endpoint does not exist'
  });
});

// Start server
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
  console.log(`Environment: ${config.nodeEnv}`);
});

module.exports = app;
