# Backend GPT - Chat API

A Node.js backend server that provides a chat API powered by Google Gemini AI. This application allows users to create chat threads, send messages, and store conversation history in MongoDB.

## Features

- **Express.js REST API** - Fast and flexible web framework
- **Google Gemini AI Integration** - Leverage cutting-edge AI for intelligent responses
- **MongoDB Database** - Persistent storage for chat threads and messages
- **Thread Management** - Create, retrieve, and manage chat conversations
- **CORS Support** - Cross-origin requests enabled for frontend integration
- **Environment Configuration** - Secure API key and database URI management

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.x
- **Database**: MongoDB with Mongoose ODM
- **AI**: Google Generative AI (Gemini)
- **Utilities**: CORS, dotenv

## Prerequisites

- Node.js (v16 or higher)
- MongoDB instance (local or cloud-hosted)
- Google Gemini API key

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend-gpt
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your API credentials:
   - `GEMINI_API_KEY` - Your Google Gemini API key
   - `MONGODB_URI` - Your MongoDB connection string
   - `PORT` - Server port (default: 8080)

## Usage

### Start the Server

```bash
npm start
```

The server will start on `http://localhost:8080`

### API Endpoints

#### Health Check
- **GET** `/test`
  - Response: `{ "message": "finally connected" }`

#### Thread Management
- **GET** `/api/thread`
  - Get all chat threads sorted by recent update
  - Response: Array of thread objects

- **GET** `/api/thread/:threadId`
  - Get all messages in a specific thread
  - Parameters: `threadId` (string)
  - Response: Array of message objects

#### Chat Functionality
- **POST** `/api/chat`
  - Send a message and get AI response
  - Body: `{ "threadId": "string", "message": "string" }`
  - Response: AI generated response

## Project Structure

```
backend-gpt/
├── index.js              # Server entry point
├── package.json          # Dependencies and scripts
├── .env                  # Environment variables (not committed)
├── .env.example          # Example environment variables
├── models/
│   ├── thread.js         # Thread schema
│   └── user.model.js     # User schema
├── routes/
│   └── chat.js           # Chat API routes
└── utils/
    └── gemini.js         # Gemini AI integration
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
GEMINI_API_KEY=your_gemini_api_key_here
MONGODB_URI=mongodb://localhost:27017/backend-gpt
PORT=8080
NODE_ENV=development
```

See `.env.example` for reference.

## Database Schema

### Thread
- `threadId` (String, required) - Unique identifier for the thread
- `title` (String) - Thread title (default: "New Chat")
- `messages` (Array of Message objects)
- `createdAt` (Date) - Creation timestamp
- `updatedAt` (Date) - Last update timestamp

### Message
- `role` (String, enum: ['user', 'assistant']) - Message sender type
- `content` (String) - Message text
- `timestamp` (Date) - Message creation time

## Development

### Scripts

```bash
# Start the server
npm start

# Run tests (not yet implemented)
npm test
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Verify `MONGODB_URI` in `.env` is correct
- Check network connectivity to MongoDB server

### Gemini API Error
- Verify `GEMINI_API_KEY` is valid and active
- Check API quota and limits
- Ensure proper API permissions are enabled

### PORT Already in Use
- Change the `PORT` value in `.env`
- Or kill the process using port 8080: `lsof -ti:8080 | xargs kill -9`

## License

ISC License

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## Support

For issues and questions, please open an issue in the repository.