# API Documentation

## Overview

This API provides endpoints to interact with OpenAI's ChatGPT model through a simple REST interface.

## Base URL

```
http://localhost:3000
```

## Authentication

Currently, the API is open in development mode. For production deployment, add an `X-API-Key` header to your requests.

## Endpoints

### GET /

Returns basic API information.

**Response:**
```json
{
  "message": "Welcome to ChatGPT API Service",
  "version": "1.0.0",
  "endpoints": {
    "health": "/health",
    "chat": "/api/chat"
  }
}
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2026-02-17T23:00:00.000Z"
}
```

### POST /api/chat

Send a message to ChatGPT and receive a complete response.

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "message": "Your message here",
  "conversationHistory": [
    {
      "role": "user",
      "content": "Previous user message"
    },
    {
      "role": "assistant",
      "content": "Previous assistant response"
    }
  ]
}
```

**Parameters:**
- `message` (string, required): The user's message
- `conversationHistory` (array, optional): Array of previous conversation messages

**Response:**
```json
{
  "success": true,
  "message": "ChatGPT's response",
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 20,
    "total_tokens": 30
  }
}
```

**Error Response:**
```json
{
  "error": "Bad Request",
  "message": "Message is required and must be a string"
}
```

### POST /api/chat/stream

Send a message to ChatGPT and receive a streaming response.

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "message": "Your message here",
  "conversationHistory": []
}
```

**Response:**

Server-Sent Events (SSE) stream with the following format:
```
data: {"content":"Hello"}

data: {"content":" there"}

data: [DONE]
```

## Rate Limits

Please be mindful of OpenAI's rate limits for your API key tier.

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid API key |
| 404 | Not Found - Endpoint doesn't exist |
| 500 | Internal Server Error |

## Examples

See the main README.md for complete examples using cURL and various programming languages.
