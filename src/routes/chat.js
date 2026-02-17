const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

/**
 * @route POST /api/chat
 * @desc Send a message to ChatGPT
 * @access Public
 */
router.post('/chat', chatController.chat);

/**
 * @route POST /api/chat/stream
 * @desc Send a message to ChatGPT with streaming response
 * @access Public
 */
router.post('/chat/stream', chatController.chatStream);

module.exports = router;
