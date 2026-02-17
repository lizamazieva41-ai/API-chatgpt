const OpenAI = require('openai');
const config = require('../config/config');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: config.openai.apiKey
});

/**
 * Send a message to ChatGPT and get a response
 * @param {string} message - The user message
 * @param {Array} conversationHistory - Optional conversation history
 * @returns {Promise<Object>} - The ChatGPT response
 */
async function getChatResponse(message, conversationHistory = []) {
  try {
    // Build messages array
    const messages = [
      {
        role: 'system',
        content: 'You are a helpful assistant.'
      },
      ...conversationHistory,
      {
        role: 'user',
        content: message
      }
    ];

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: config.openai.model,
      messages: messages,
      max_tokens: config.openai.maxTokens,
      temperature: config.openai.temperature
    });

    return {
      success: true,
      response: response.choices[0].message.content,
      usage: response.usage
    };
  } catch (error) {
    console.error('OpenAI API Error:', error.message);
    throw new Error(`Failed to get response from ChatGPT: ${error.message}`);
  }
}

/**
 * Stream chat response from ChatGPT
 * @param {string} message - The user message
 * @param {Array} conversationHistory - Optional conversation history
 * @returns {Promise<Stream>} - The streaming response
 */
async function getChatStreamResponse(message, conversationHistory = []) {
  try {
    const messages = [
      {
        role: 'system',
        content: 'You are a helpful assistant.'
      },
      ...conversationHistory,
      {
        role: 'user',
        content: message
      }
    ];

    const stream = await openai.chat.completions.create({
      model: config.openai.model,
      messages: messages,
      max_tokens: config.openai.maxTokens,
      temperature: config.openai.temperature,
      stream: true
    });

    return stream;
  } catch (error) {
    console.error('OpenAI API Streaming Error:', error.message);
    throw new Error(`Failed to stream response from ChatGPT: ${error.message}`);
  }
}

module.exports = {
  getChatResponse,
  getChatStreamResponse
};
