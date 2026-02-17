const chatService = require('../services/chatService');

/**
 * Handle chat request
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
async function chat(req, res) {
  try {
    const { message, conversationHistory } = req.body;

    // Validate input
    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Message is required and must be a string'
      });
    }

    // Get response from ChatGPT
    const result = await chatService.getChatResponse(
      message,
      conversationHistory || []
    );

    res.json({
      success: true,
      message: result.response,
      usage: result.usage
    });
  } catch (error) {
    console.error('Chat Controller Error:', error.message);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
}

/**
 * Handle streaming chat request
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
async function chatStream(req, res) {
  try {
    const { message, conversationHistory } = req.body;

    // Validate input
    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Message is required and must be a string'
      });
    }

    // Set headers for streaming
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Get streaming response from ChatGPT
    const stream = await chatService.getChatStreamResponse(
      message,
      conversationHistory || []
    );

    // Stream the response
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    console.error('Chat Stream Controller Error:', error.message);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
}

module.exports = {
  chat,
  chatStream
};
