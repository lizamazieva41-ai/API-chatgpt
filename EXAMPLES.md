# Examples

## JavaScript/Node.js

### Using Fetch API

```javascript
const fetch = require('node-fetch');

async function chatWithGPT(message) {
  const response = await fetch('http://localhost:3000/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: message
    })
  });

  const data = await response.json();
  console.log('ChatGPT:', data.message);
  return data;
}

// Usage
chatWithGPT('What is the meaning of life?');
```

### Using Axios

```javascript
const axios = require('axios');

async function chatWithGPT(message, history = []) {
  try {
    const response = await axios.post('http://localhost:3000/api/chat', {
      message: message,
      conversationHistory: history
    });

    console.log('ChatGPT:', response.data.message);
    console.log('Tokens used:', response.data.usage.total_tokens);
    return response.data;
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

// Usage
chatWithGPT('Hello!');
```

### Streaming Response

```javascript
const fetch = require('node-fetch');

async function chatStreamWithGPT(message) {
  const response = await fetch('http://localhost:3000/api/chat/stream', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: message
    })
  });

  const reader = response.body;
  reader.on('data', (chunk) => {
    const lines = chunk.toString().split('\n');
    lines.forEach((line) => {
      if (line.startsWith('data: ')) {
        const data = line.slice(6);
        if (data === '[DONE]') {
          console.log('\nStream complete!');
        } else {
          try {
            const parsed = JSON.parse(data);
            process.stdout.write(parsed.content);
          } catch (e) {
            // Ignore parse errors
          }
        }
      }
    });
  });
}

// Usage
chatStreamWithGPT('Tell me a short story');
```

## Python

### Using Requests

```python
import requests

def chat_with_gpt(message, history=None):
    url = 'http://localhost:3000/api/chat'
    payload = {
        'message': message,
        'conversationHistory': history or []
    }
    
    response = requests.post(url, json=payload)
    data = response.json()
    
    if response.status_code == 200:
        print(f"ChatGPT: {data['message']}")
        print(f"Tokens used: {data['usage']['total_tokens']}")
        return data
    else:
        print(f"Error: {data['message']}")
        return None

# Usage
chat_with_gpt('What is artificial intelligence?')
```

### Conversation with History

```python
import requests

def maintain_conversation():
    url = 'http://localhost:3000/api/chat'
    history = []
    
    while True:
        user_input = input('You: ')
        if user_input.lower() in ['quit', 'exit', 'bye']:
            print('Goodbye!')
            break
        
        payload = {
            'message': user_input,
            'conversationHistory': history
        }
        
        response = requests.post(url, json=payload)
        data = response.json()
        
        if response.status_code == 200:
            assistant_message = data['message']
            print(f'ChatGPT: {assistant_message}\n')
            
            # Update conversation history
            history.append({'role': 'user', 'content': user_input})
            history.append({'role': 'assistant', 'content': assistant_message})
        else:
            print(f"Error: {data['message']}\n")

# Usage
maintain_conversation()
```

## cURL

### Simple Chat

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hello, ChatGPT!"
  }'
```

### Chat with History

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Can you elaborate on that?",
    "conversationHistory": [
      {
        "role": "user",
        "content": "Tell me about space"
      },
      {
        "role": "assistant",
        "content": "Space is vast and fascinating..."
      }
    ]
  }'
```

### Streaming Response

```bash
curl -N -X POST http://localhost:3000/api/chat/stream \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Write a haiku about coding"
  }'
```

## Postman

1. Create a new POST request
2. Set URL to: `http://localhost:3000/api/chat`
3. Set Headers:
   - `Content-Type: application/json`
4. Set Body (raw JSON):
```json
{
  "message": "Your message here"
}
```
5. Click Send

## React Example

```jsx
import React, { useState } from 'react';

function ChatGPTComponent() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setResponse(data.message);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error communicating with ChatGPT');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask ChatGPT..."
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
      {response && (
        <div>
          <h3>Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default ChatGPTComponent;
```
