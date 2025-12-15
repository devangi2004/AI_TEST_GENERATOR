# AI Test Generator

An AI-powered test generation platform that creates comprehensive, subject-specific assessments.

## Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** (comes with Node.js)

## Setup Instructions

### 1. Install Backend Dependencies

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=5000

# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/test-generator
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/test-generator

# Default Admin Account (optional - will be created on first run)
DEFAULT_ADMIN_EMAIL=admin@example.com
DEFAULT_ADMIN_PASSWORD=admin123

# JWT Secret (generate a random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# AI Service API Key (Google Generative AI / Gemini)
GEMINI_API_KEY=your-gemini-api-key-here
```

**Note:** Replace the placeholder values with your actual configuration.

### 3. Start MongoDB

Make sure MongoDB is running on your system:

- **Windows:** MongoDB should be running as a service, or start it manually
- **macOS/Linux:** `sudo systemctl start mongod` or `brew services start mongodb-community`

If you're using MongoDB Atlas, you don't need to run MongoDB locally.

### 4. Run the Backend Server

From the `backend` directory:

```bash
# Development mode (with auto-reload)
npm run dev

# OR Production mode
npm start
```

The server will start on `http://localhost:5000` (or the port specified in your `.env` file).

### 5. Open the Frontend

The frontend consists of static HTML files. You can open them directly in your browser:

1. Open `frontend/index.html` in your web browser
2. Or use a local server (recommended):
   ```bash
   # Using Python (if installed)
   cd frontend
   python -m http.server 8000
   
   # Using Node.js http-server (if installed globally)
   npx http-server frontend -p 8000
   ```

Then navigate to `http://localhost:8000` in your browser.

## Usage

1. **Sign Up/Login**: Create an account or sign in using the frontend
2. **Generate Tests**: Fill out the test configuration form and generate AI-powered tests
3. **Preview**: Review generated questions in the preview tab
4. **Download/Share**: Export or share your tests (features in development)

## Project Structure

```
test-generator-3/
├── backend/           # Node.js/Express backend
│   ├── src/
│   │   ├── config/    # Database configuration
│   │   ├── controllers/ # Route controllers
│   │   ├── middlewares/ # Auth & error handling
│   │   ├── models/     # MongoDB models
│   │   ├── routes/     # API routes
│   │   ├── services/   # Business logic & AI services
│   │   └── utils/      # Helper functions
│   └── package.json
├── frontend/          # Static HTML/CSS frontend
│   ├── index.html     # Main page
│   ├── signin.html    # Sign in page
│   ├── signup.html    # Sign up page
│   └── styles.css     # Styling
└── README.md
```

## API Endpoints

The backend provides RESTful API endpoints:

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User authentication
- `POST /api/tests/generate` - Generate AI test (requires authentication)
- Additional endpoints for user management and admin functions

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check your `MONGO_URI` in the `.env` file
- Verify network connectivity if using MongoDB Atlas

### Port Already in Use
- Change the `PORT` in your `.env` file
- Or stop the process using port 5000

### Frontend Can't Connect to Backend
- Ensure the backend server is running
- Check that the API URL in frontend matches your backend port
- Verify CORS is enabled in the backend (should be configured)

## Development

- Backend uses Express.js with MongoDB (Mongoose)
- Frontend uses vanilla JavaScript (no framework)
- AI integration supports OpenAI and Google Generative AI

## License

[Your License Here]

