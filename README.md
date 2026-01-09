# Mr. Incredible 🎭

A fun web application that roasts GitHub users using AI! Enter a GitHub username and watch Mr. Incredible deliver savage, hilarious roasts powered by Google's Gemini AI.

## 🌟 Features

- **GitHub User Roasting**: Enter any GitHub username to get a personalized AI-generated roast
- **Interactive UI**: Dynamic animations and Mr. Incredible meme reactions
- **Real-time Data**: Fetches live GitHub profile data (repos, followers, bio, etc.)
- **AI-Powered**: Uses Google Gemini 2.5 Flash for creative and hilarious roasts
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
- **Axios** - GitHub API integration
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

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
    ├── index.js               # Server entry point
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key

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
   PORT=3000
   GEMENIE_API_KEY=your_google_gemini_api_key_here
   ```

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

## 🎮 How to Use

1. Enter a valid GitHub username in the input field
2. Click the send button or press Enter
3. Watch Mr. Incredible's reaction as he generates a roast
4. Enjoy the AI-generated savage roast!

## 📝 API Endpoints

### `GET /`
- Health check endpoint
- Returns: Welcome message

### `GET /troll/:username`
- Generates a roast for the specified GitHub user
- Parameters: `username` (GitHub username)
- Returns: JSON object with the roast text
- Example: `http://localhost:3000/troll/octocat`

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

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check issues page.

## 📄 License

ISC

## 👤 Author

**Sawan**

## 🙏 Acknowledgments

- Mr. Incredible meme format
- GitHub API for user data
- Google Gemini AI for roast generation
- The open-source community

---

**Note**: This is a fun project meant for entertainment purposes. Please be respectful and don't use it to harass or bully anyone! 🎉
