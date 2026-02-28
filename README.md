# Mr. Incredible
Link:- https://mr-incredible.vercel.app/

A fun web application that roasts GitHub users using AI! Enter a GitHub username and watch Mr. Incredible deliver savage, hilarious roasts powered by Google's Gemini AI.

## 🌟 Features

- **GitHub User Roasting**: Enter any GitHub username to get a personalized AI-generated roast
- **Interactive UI**: Dynamic animations and Mr. Incredible meme reactions
- **Real-time Data**: Fetches live GitHub profile data (repos, followers, bio, etc.)
- **AI-Powered**: Uses Google Gemini 2.5 Flash for creative and hilarious roasts
- **Redis Caching**: Cached roasts for 10 minutes to improve performance and reduce API calls
- **Rate Limiting**: Prevents abuse with Redis-backed rate limiting (10 requests per minute)
- **Structured Logging**: Pino logger for better debugging and monitoring
- **Docker Support**: Containerized deployment with Docker and Docker Compose
- **Modern Tech Stack**: Built with React, Express, and modern web technologies

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **TailwindCSS 4** - Styling
- **Motion** - Animations
- **Axios** - HTTP client
- **Lucide React** - Icons

### Backend
- **Express 5** - Web server framework
- **Google Gemini AI** - AI model for roast generation
- **Redis** - Caching layer for improved performance
- **Pino** - Fast JSON logger with pretty printing in development
- **Rate Limiting** - Redis-backed rate limiting with express-rate-limit
- **Axios** - GitHub API integration
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management
- **Docker** - Containerization support

## 📁 Project Structure

```
Mr. Incredible/
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── Landing.jsx        # Main landing page
│   │   ├── main.jsx           # App entry point
│   │   ├── index.css          # Global styles
│   │   ├── components/        # React components
│   │   ├── assets/            # Images and fonts
│   │   └── lib/               # Utility functions
│   ├── public/                # Static assets
│   ├── index.html             # HTML template
│   ├── package.json
│   └── vite.config.js
│
└── backend/            # Express backend server
    ├── controller/            # Request handlers
    │   └── generateRoast.js   # Roast generation logic
    ├── routes/                # API routes
    │   └── generateRoastRoute.js
    ├── middleware/            # Express middleware
    │   └── rateLimiter.js     # Rate limiting configuration
    ├── config/                # Configuration files
    │   └── redisConfig.js     # Redis client setup
    ├── utils/                 # Utility functions
    │   └── logger.js          # Pino logger configuration
    ├── index.js               # Server entry point
    ├── package.json
    ├── Dockerfile             # Docker configuration
    ├── .dockerignore
    └── vercel.json            # Vercel deployment config
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key ([Get one here](https://aistudio.google.com/apikey))
- Redis (local installation or cloud service)
  - **Local**: Install from [redis.io](https://redis.io/download)
  - **Docker**: Use the provided docker-compose.yml
  - **Cloud**: Upstash, Redis Labs, AWS ElastiCache, etc.

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Mr. Incredible"
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configure Environment Variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   GEMENIE_API_KEY=your_google_gemini_api_key_here
   REDIS_URL=redis://localhost:6379
   NODE_ENV=development
   ```
   
   **Note**: For production deployments, you'll need a Redis instance. You can use:
   - Local Redis installation
   - Docker container (see Docker section below)
   - Cloud Redis services (AWS ElastiCache, Redis Labs, Upstash, etc.)

4. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

5. **Configure Frontend Environment**
   
   Create a `.env` file in the `frontend` directory:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Server will run on `http://localhost:3000`

2. **Start the Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:5173` (or another port if 5173 is busy)

3. **Open your browser** and navigate to the frontend URL

## 🐳 Docker Deployment

### Using Docker

1. **Build the Docker image**
   ```bash
   cd backend
   docker build -t mr-incredible-backend .
   ```

2. **Run the container**
   ```bash
   docker run -p 5000:5000 --env-file .env mr-incredible-backend
   ```

### Using Docker Compose (Recommended)

The project includes a Docker Compose configuration that sets up both the backend and Redis:

```bash
cd backend
docker-compose up
```

This will start:
- Backend server on port 5000
- Redis on port 6379

**Note**: Update your `.env` file to use `REDIS_URL=redis://redis:6379` when using Docker Compose.

## 🎮 How to Use

1. Enter a valid GitHub username in the input field
2. Click the send button or press Enter
3. Watch Mr. Incredible's reaction as he generates a roast
4. Enjoy the AI-generated savage roast!

## 📝 API Endpoints

### `GET /`
- Health check endpoint
- Returns: Welcome message

### `GET /api/troll/:username`
- Generates a roast for the specified GitHub user
- Parameters: `username` (GitHub username)
- Returns: JSON object with the roast text
- Example: `http://localhost:5000/api/troll/octocat`

**Features:**
- **Caching**: Roasts are cached in Redis for 10 minutes to reduce API calls and improve response time
- **Rate Limiting**: Maximum 10 requests per minute per IP address
- **Error Handling**: Returns appropriate status codes and error messages
  - `404`: User not found on GitHub
  - `429`: Rate limit exceeded (returns "Too many roasts. Calm down 🔥")
  - `500`: Server error (API failures, etc.)

**Response Format:**
```json
{
  "roast": "Your savage roast text here... 🔥"
}
```

**Error Response:**
```json
{
  "error": "Error type",
  "message": "Detailed error message"
}
```

## 🎨 Screenshots

*The app features three states:*
- Initial state with Mr. Incredible
- Loading state with "finding" animation
- Final roast reveal with the ultimate Mr. Incredible reaction

## 🔧 Development

### Frontend Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend Scripts
```bash
npm run dev      # Start development server with nodemon
```

## 🏗️ Backend Architecture

### Caching Strategy
- **Redis-based caching**: All roasts are cached for 10 minutes
- **Cache key format**: `roast:{username}`
- **Benefits**: Reduces API calls to Gemini AI and GitHub, improves response time

### Rate Limiting
- **Implementation**: Redis-backed rate limiting using `express-rate-limit`
- **Limits**: 10 requests per minute per IP
- **Storage**: Redis store for distributed rate limiting
- **Error message**: "Too many roasts. Calm down 🔥"

### Logging
- **Development**: Pretty-printed colored logs with `pino-pretty`
- **Production**: JSON-formatted logs for easy parsing and monitoring
- **Events logged**:
  - Cache hits/misses
  - GitHub API requests
  - Errors and exceptions
  - Rate limit violations

### Error Handling
- All errors return proper HTTP status codes
- Structured error responses with helpful messages
- Frontend displays user-friendly error messages

## 🔍 Troubleshooting

### Common Issues

**Redis Connection Error**
```
Error: connect ECONNREFUSED 127.0.0.1:6379
```
- **Solution**: Make sure Redis is running. Start it with `redis-server` or use Docker Compose.

**Rate Limiting Package Error**
```
Error: unable to determine transport target for "pino-pretty"
```
- **Solution**: Install `pino-pretty` with `npm install pino-pretty` (dev dependency)

**Google API Authentication Error**
```
Error: Could not load the default credentials
```
- **Solution**: Make sure you're using `@google/genai` package (not `@google/generative-ai`) and your API key is set correctly in `.env`

**CORS Error**
```
Access-Control-Allow-Origin header is present
```
- **Solution**: Ensure the frontend URL is added to the CORS whitelist in `backend/index.js`

## 🚀 Deployment

### Vercel (Backend)

The backend is configured for Vercel deployment with `vercel.json`:

1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to backend directory: `cd backend`
3. Deploy: `vercel`
4. Add environment variables in Vercel dashboard:
   - `GEMENIE_API_KEY`
   - `REDIS_URL` (use a cloud Redis service like Upstash)
   - `NODE_ENV=production`

### Vercel (Frontend)

1. Navigate to frontend directory: `cd frontend`
2. Update `.env` with production API URL
3. Deploy: `vercel`

### Important Notes
- **Redis**: Vercel is serverless, so you need a cloud Redis service (Upstash recommended)
- **CORS**: Update allowed origins in `backend/index.js` to include your production URL
- **Environment**: Pino logger automatically switches to JSON format in production

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check issues page.

## 📄 License

ISC

## 👤 Author

**Kedar Sawant**

## 🙏 Acknowledgments

- Mr. Incredible meme format
- GitHub API for user data
- Google Gemini AI for roast generation
- The open-source community

---

**Note**: This is a fun project meant for entertainment purposes. Please be respectful and don't use it to harass or bully anyone! 🎉
