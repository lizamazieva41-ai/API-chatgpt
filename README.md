# API-chatgpt

A RESTful API service for integrating with OpenAI's ChatGPT. This project provides a simple and efficient way to interact with ChatGPT through HTTP endpoints.

## Features

- 🚀 Simple REST API interface for ChatGPT
- 💬 Support for regular and streaming responses
- 🔄 Conversation history management
- 🛡️ Built-in error handling and validation
- 📝 Request logging middleware
- 🔐 Optional API key authentication
- ⚙️ Configurable OpenAI settings

## Project Structure

```
API-chatgpt/
├── src/
│   ├── app.js                 # Main application entry point
│   ├── routes/
│   │   └── chat.js            # Chat API routes
│   ├── controllers/
│   │   └── chatController.js  # Chat request handlers
│   ├── services/
│   │   └── chatService.js     # OpenAI API integration
│   ├── config/
│   │   └── config.js          # Configuration settings
│   ├── middleware/
│   │   ├── auth.js            # Authentication middleware
│   │   └── logger.js          # Request logging
│   └── utils/
│       └── responseFormatter.js # Response formatting utilities
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore rules
├── package.json               # Project dependencies
└── README.md                  # This file
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key

## Installation

1. Clone the repository:
```bash
git clone https://github.com/lizamazieva41-ai/API-chatgpt.git
cd API-chatgpt
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file from the example:
```bash
cp .env.example .env
```

4. Add your OpenAI API key to the `.env` file:
```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
NODE_ENV=development
```

## Usage

### Development Mode

Run the server in development mode with auto-reload:
```bash
npm run dev
```

### Production Mode

Run the server in production mode:
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## API Endpoints

### 1. Health Check

Check if the API is running.

**Endpoint:** `GET /health`

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2026-02-17T23:00:00.000Z"
}
```

### 2. Chat with ChatGPT

Send a message to ChatGPT and receive a response.

**Endpoint:** `POST /api/chat`

**Request Body:**
```json
{
  "message": "Hello, how are you?",
  "conversationHistory": [
    {
      "role": "user",
      "content": "Previous message"
    },
    {
      "role": "assistant",
      "content": "Previous response"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "I'm doing well, thank you! How can I help you today?",
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 15,
    "total_tokens": 25
  }
}
```

### 3. Streaming Chat Response

Send a message and receive a streaming response.

**Endpoint:** `POST /api/chat/stream`

**Request Body:**
```json
{
  "message": "Tell me a story",
  "conversationHistory": []
}
```

**Response:** Server-Sent Events (SSE) stream with chunks of the response.

## Example Usage with cURL

### Basic Chat Request

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What is artificial intelligence?"
  }'
```

### Chat with Conversation History

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Tell me more about that",
    "conversationHistory": [
      {
        "role": "user",
        "content": "What is AI?"
      },
      {
        "role": "assistant",
        "content": "AI stands for Artificial Intelligence..."
      }
    ]
  }'
```

### Streaming Response

```bash
curl -X POST http://localhost:3000/api/chat/stream \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Write a short poem"
  }'
```

## Configuration

You can configure the following environment variables in your `.env` file:

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENAI_API_KEY` | Your OpenAI API key | Required |
| `PORT` | Server port | 3000 |
| `NODE_ENV` | Environment (development/production) | development |
| `OPENAI_MODEL` | OpenAI model to use | gpt-3.5-turbo |
| `MAX_TOKENS` | Maximum tokens in response | 1000 |
| `TEMPERATURE` | Response creativity (0-2) | 0.7 |

## Error Handling

The API returns standard HTTP status codes:

- `200` - Success
- `400` - Bad Request (invalid input)
- `401` - Unauthorized (invalid API key)
- `404` - Not Found (endpoint doesn't exist)
- `500` - Internal Server Error

Example error response:
```json
{
  "error": "Bad Request",
  "message": "Message is required and must be a string"
}
```

## Security Considerations

1. **Never commit your `.env` file** - It contains sensitive API keys
2. **Use HTTPS in production** - Protect data in transit
3. **Implement rate limiting** - Prevent abuse
4. **Validate all inputs** - Prevent injection attacks
5. **Use authentication** - Protect your endpoints in production

## Development

### Running Tests

```bash
npm test
```

### Linting

```bash
npm run lint
```

## Deployment

### Docker Deployment

The easiest way to deploy this application is using Docker.

1. Build the Docker image:
```bash
docker build -t api-chatgpt .
```

2. Run the container:
```bash
docker run -p 3000:3000 -e OPENAI_API_KEY=your_key_here api-chatgpt
```

### Docker Compose

For a more complete deployment setup:

1. Create a `.env` file with your configuration
2. Run with Docker Compose:
```bash
docker-compose up -d
```

### Manual Deployment

1. Install dependencies:
```bash
npm install --production
```

2. Set environment variables
3. Start the server:
```bash
NODE_ENV=production npm start
```

### Cloud Deployment

This application can be deployed to various cloud platforms:

- **Heroku**: Add a `Procfile` with `web: node src/app.js`
- **AWS Elastic Beanstalk**: Deploy using the Node.js platform
- **Google Cloud Run**: Use the provided Dockerfile
- **DigitalOcean App Platform**: Connect your GitHub repo
- **Vercel/Netlify**: Configure as a Node.js serverless function

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

## Support

For issues and questions, please open an issue on the GitHub repository.

## Acknowledgments

- Built with [Express.js](https://expressjs.com/)
- Powered by [OpenAI API](https://openai.com/api/)

---

**Note:** This is a basic implementation. For production use, consider adding:
- Rate limiting
- Request validation with a library like Joi
- Database integration for conversation persistence
- User authentication and authorization
- Comprehensive logging
- Unit and integration tests
- API documentation with Swagger/OpenAPI