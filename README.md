# 🎬 CineList - Movie Watchlist Application

A full-stack movie watchlist application with a modern Next.js frontend and a robust Express backend. Manage your movie database, track your personal watchlist, and visualize your movie-watching journey.

[![TypeScript](https://img.shields.io/badge/TypeScript-86.7%25-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Documentation](#-api-documentation)
- [Architecture](#-architecture)
- [Development](#-development)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## 🌟 Overview

CineList is a comprehensive movie management platform that allows users to:
- Build and maintain a personal movie database
- Create and manage watchlists with custom statuses
- Track watching progress with detailed statistics
- Add personal notes and ratings to movies

The application consists of two main components:
- **Backend API**: RESTful API built with Express, TypeScript, and Prisma
- **Frontend**: Modern Next.js 15 application with a beautiful dark-mode UI

## ✨ Features

### 🔐 Authentication & Security
- Secure JWT-based authentication with HTTP-only cookies
- Protected routes and API endpoints
- Password hashing with bcrypt
- Input validation on all requests

### 🎥 Movie Database Management
- Add, edit, and delete movies
- Browse complete movie database
- Search and filter capabilities
- Detailed movie information (title, description, year, genre, rating, poster, cast, director)

### 📝 Personal Watchlist
- Track movies with custom statuses: **Planned**, **Watched**, **Not Interested**
- Add private notes to each movie
- Personal rating system
- View watchlist history and statistics

### 📊 Dashboard & Analytics
- Visual statistics of watchlist status
- Movies watched vs. planned
- Recent activity tracking
- Quick action buttons

### 🎨 Modern UI/UX
- Beautiful dark-mode design
- Smooth animations and transitions
- Responsive layout (mobile, tablet, desktop)
- Custom design system with Tailwind CSS
- Optimistic UI updates
- Loading skeletons and empty states

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database ORM**: Prisma
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: Zod
- **Password Hashing**: bcryptjs
- **Cookie Parsing**: cookie-parser

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Vanilla CSS (Custom Design System)
- **State Management**: Zustand (Auth State)
- **Data Fetching**: Axios + TanStack React Query (v5)
- **Form Handling**: React Hook Form + Zod validation
- **Notifications**: Sonner
- **Icons**: Lucide React

### Database
- PostgreSQL / MySQL / SQLite (configurable via Prisma)

## 📁 Project Structure

```
movieWatchList/
├── frontend/                 # Next.js Frontend Application
│   ├── src/
│   │   ├── app/             # Next.js App Router pages
│   │   ├── components/      # Reusable React components
│   │   ├── lib/             # Utilities, API client, types
│   │   ├── hooks/           # Custom React hooks
│   │   ├── store/           # Zustand state management
│   │   └── styles/          # Global styles
│   ├── public/              # Static assets
│   ├── .env.local           # Frontend environment variables
│   ├── .env.example         # Environment variables template
│   ├── next.config.ts       # Next.js configuration (with API proxy)
│   ├── tailwind.config.ts   # Tailwind CSS configuration
│   └── package.json
│
├── src/                      # Backend Source Code
│   ├── controllers/         # Request handlers
│   │   ├── authController.ts
│   │   ├── movieController.ts
│   │   └── watchListController.ts
│   ├── routes/              # API route definitions
│   │   ├── authRoutes.ts
│   │   ├── movieRoutes.ts
│   │   └── watchListRoutes.ts
│   ├── middlewares/         # Custom middleware
│   │   ├── authMiddleware.ts
│   │   ├── errorMiddleware.ts
│   │   └── validateRequest.ts
│   ├── validators/          # Zod validation schemas
│   │   ├── authValidators.ts
│   │   ├── movieValidators.ts
│   │   └── watchlistValidators.ts
│   ├── utils/               # Utility functions
│   ├── types/               # TypeScript type definitions
│   ├── app.ts               # Express app configuration
│   └── server.ts            # Server entry point
│
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── migrations/          # Database migrations
│
├── .env                     # Backend environment variables
├── .env.example             # Environment variables template
├── .gitignore
├── package.json             # Backend dependencies
├── tsconfig.json            # TypeScript configuration
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18.x or higher)
- **npm** / **yarn** / **pnpm**
- **PostgreSQL** / **MySQL** / **SQLite** (depending on your choice)
- **Git**

### Backend Setup

#### 1. Clone the repository

```bash
git clone https://github.com/Ravi8043/movieWatchList.git
cd movieWatchList
```

#### 2. Install backend dependencies

```bash
npm install
```

#### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/moviedb"
# Or for SQLite (for quick start)
# DATABASE_URL="file:./dev.db"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Server
PORT=5000
NODE_ENV=development

# Cookie Settings
COOKIE_EXPIRES_IN=7d
```

#### 4. Setup the database

```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Optional: Seed the database
npx prisma db seed

# Optional: Open Prisma Studio to view your database
npx prisma studio
```

#### 5. Start the backend server

```bash
npm run dev
```

The backend API will be running at `http://localhost:5000`

**Verify backend is working:**
```bash
curl http://localhost:5000/auth/login
# Should return error (since no credentials provided)
```

---

### Frontend Setup

#### 1. Navigate to frontend folder

```bash
cd frontend
```

#### 2. Install frontend dependencies

```bash
npm install
```

#### 3. Configure environment variables

The frontend uses Next.js app rewrites to proxy requests to your backend (this solves CORS issues without modifying backend code).

Create a `.env.local` file in the `frontend` folder:

```bash
cp .env.example .env.local
```

Default `.env.local` content:

```env
# Backend API URL (used by Next.js rewrite proxy)
NEXT_PUBLIC_API_URL=http://localhost:5000

# App Configuration
NEXT_PUBLIC_APP_NAME=CineList
```

**Note:** The Next.js configuration (`next.config.ts`) automatically proxies all `/api/*` requests to your backend, preventing CORS issues.

#### 4. Start the frontend development server

```bash
npm run dev
```

The frontend will be running at `http://localhost:3000`

#### 5. Open your browser

Navigate to `http://localhost:3000` and start using CineList!

### 🎉 Quick Start Summary

```bash
# Terminal 1 - Backend
git clone https://github.com/Ravi8043/movieWatchList.git
cd movieWatchList
npm install
# Create .env file (see Backend Setup step 3)
npx prisma generate
npx prisma migrate dev --name init
npm run dev

# Terminal 2 - Frontend
cd frontend
npm install
cp .env.example .env.local
npm run dev

# Open http://localhost:3000 in your browser
```

## 📚 API Documentation

Base URL: `http://localhost:5000`  
Frontend Proxy: `http://localhost:3000/api/*`

### Authentication Endpoints

All authentication endpoints are public (no authentication required).

#### Register a new user

```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
Sets HTTP-only cookie with JWT token
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### Logout

```http
POST /auth/logout
```

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### Movie Endpoints

All movie endpoints require authentication (JWT cookie).

#### Get all movies

```http
GET /movies
```

**Response:**
```json
{
  "success": true,
  "movies": [
    {
      "id": "uuid",
      "title": "Inception",
      "description": "A thief who steals corporate secrets...",
      "releaseYear": 2010,
      "genre": "Sci-Fi",
      "rating": 8.8,
      "poster": "https://example.com/poster.jpg",
      "director": "Christopher Nolan",
      "cast": ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Get single movie

```http
GET /movies/:id
```

#### Add a new movie

```http
POST /movies/add
Content-Type: application/json

{
  "title": "Inception",
  "description": "A thief who steals corporate secrets through dream-sharing technology",
  "releaseYear": 2010,
  "genre": "Sci-Fi",
  "rating": 8.8,
  "poster": "https://example.com/poster.jpg",
  "director": "Christopher Nolan",
  "cast": ["Leonardo DiCaprio", "Joseph Gordon-Levitt"]
}
```

#### Update a movie

```http
PUT /movies/update/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "rating": 9.0
}
```

#### Delete a movie

```http
DELETE /movies/remove/:id
```

---

### Watchlist Endpoints

All watchlist endpoints require authentication.

#### Get user's watchlist

```http
GET /watchlist
```

**Response:**
```json
{
  "success": true,
  "watchlist": [
    {
      "id": "uuid",
      "userId": "user-uuid",
      "movieId": "movie-uuid",
      "status": "planned",
      "watched": false,
      "notes": "Want to watch this weekend",
      "personalRating": null,
      "movie": {
        "title": "Inception",
        "poster": "https://example.com/poster.jpg",
        "releaseYear": 2010
      },
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Get single watchlist item

```http
GET /watchlist/:id
```

#### Add movie to watchlist

```http
POST /watchlist/add
Content-Type: application/json

{
  "movieId": "movie-uuid",
  "status": "planned",
  "watched": false,
  "notes": "Recommended by a friend",
  "personalRating": 8
}
```

#### Update watchlist item

```http
PUT /watchlist/update/:id
Content-Type: application/json

{
  "status": "watched",
  "watched": true,
  "notes": "Amazing movie!",
  "personalRating": 9
}
```

#### Remove from watchlist

```http
DELETE /watchlist/delete/:id
```

## 🏗 Architecture

### Full-Stack Flow

```
User Browser (localhost:3000)
      ↓
Next.js Frontend (React Components)
      ↓
TanStack Query (Data Fetching)
      ↓
Axios Client (with credentials)
      ↓
Next.js Rewrite Proxy (/api/*)
      ↓
Express Backend (localhost:5000)
      ↓
Auth Middleware → Validation → Controller
      ↓
Prisma ORM
      ↓
Database (PostgreSQL/MySQL/SQLite)
```

### Frontend Architecture

```
Components
    ↓
React Query Hooks (useMovies, useWatchlist)
    ↓
API Client (Axios with interceptors)
    ↓
Zustand Store (Auth State)
    ↓
React Hook Form + Zod (Validation)
```

### Backend Architecture

```
Request → JSON Parser → Cookie Parser
            ↓
      Route Handler
            ↓
   Auth Middleware (if protected)
            ↓
   Validation Middleware (Zod)
            ↓
       Controller
            ↓
   Prisma Database Operations
            ↓
Response / Error Handler
```

### Authentication Flow

1. User submits login credentials via frontend form
2. Frontend sends POST request to `/api/auth/login`
3. Next.js proxy forwards to backend `/auth/login`
4. Backend validates credentials and generates JWT
5. JWT stored in HTTP-only cookie (secure, not accessible via JS)
6. Cookie automatically included in all subsequent requests
7. Backend auth middleware validates token on protected routes
8. Frontend Zustand store manages auth state for UI

### Database Schema (Prisma)

```prisma
model User {
  id        String      @id @default(uuid())
  email     String      @unique
  password  String
  name      String?
  watchlist Watchlist[]
  createdAt DateTime    @default(now())
  updatedAt DateTime    @updatedAt
}

model Movie {
  id          String      @id @default(uuid())
  title       String
  description String?
  releaseYear Int?
  genre       String?
  rating      Float?
  poster      String?
  director    String?
  cast        String[]
  watchlists  Watchlist[]
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}

model Watchlist {
  id             String   @id @default(uuid())
  userId         String
  movieId        String
  status         String   @default("planned") // planned, watched, not_interested
  watched        Boolean  @default(false)
  notes          String?
  personalRating Int?
  user           User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  movie          Movie    @relation(fields: [movieId], references: [id], onDelete: Cascade)
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  @@unique([userId, movieId])
}
```

## 💻 Development

### Available Scripts

#### Backend Scripts

```bash
# Start development server with auto-reload
npm run dev

# Build TypeScript to JavaScript
npm run build

# Start production server
npm start

# Run database migrations
npm run migrate

# Open Prisma Studio (Database GUI)
npm run studio

# Generate Prisma Client
npm run generate
```

#### Frontend Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npm run type-check
```

### Development Workflow

1. **Start both servers** (backend and frontend)
   ```bash
   # Terminal 1 - Backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend && npm run dev
   ```

2. **Make changes**
   - Backend changes: Controllers, routes, validators, database schema
   - Frontend changes: Components, pages, styles, API calls

3. **Test your changes**
   - Backend: Use Postman, curl, or frontend
   - Frontend: Browser at `http://localhost:3000`

4. **Database changes**
   ```bash
   # After modifying prisma/schema.prisma
   npx prisma migrate dev --name your_migration_name
   npx prisma generate
   ```

### Troubleshooting

#### CORS Errors
**Problem:** Getting CORS errors when making API requests

**Solution:** Ensure you're making requests to `/api/*` (not `http://localhost:5000/*`) so the Next.js rewrite proxy works properly.

```typescript
// ✅ Correct
const response = await axios.get('/api/movies');

// ❌ Wrong
const response = await axios.get('http://localhost:5000/movies');
```

#### Authentication Not Working
**Problem:** User login not persisting or getting 401 errors

**Solution:**
1. Verify backend JWT_SECRET is set in `.env`
2. Check that cookies are being sent with requests:
   ```typescript
   // In your axios config
   axios.create({
     baseURL: '/api',
     withCredentials: true, // This is crucial!
   });
   ```
3. Ensure HTTP-only cookie configuration is correct in backend

#### Database Connection Issues
**Problem:** Prisma can't connect to database

**Solution:**
1. Check `DATABASE_URL` in `.env` is correct
2. Ensure database server is running
3. For SQLite: Use `file:./dev.db` for quick start
4. Run `npx prisma db push` to sync schema

#### Frontend Build Errors
**Problem:** Type errors or build failures

**Solution:**
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Type check
npm run type-check
```

## 🔒 Security Best Practices

### Implemented Security Features

✅ **JWT Authentication** - Secure token-based auth  
✅ **HTTP-only Cookies** - Tokens not accessible via JavaScript (XSS protection)  
✅ **Password Hashing** - bcrypt with salt rounds  
✅ **Input Validation** - Zod schemas on all inputs  
✅ **SQL Injection Protection** - Prisma ORM prevents SQL injection  
✅ **Type Safety** - TypeScript throughout  
✅ **Protected Routes** - Auth middleware on sensitive endpoints  
✅ **CORS Configuration** - Next.js proxy handles CORS securely  
✅ **Environment Variables** - Secrets not committed to Git  

### Additional Recommendations for Production

- Use HTTPS in production
- Set secure cookie flags in production:
  ```typescript
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  httpOnly: true,
  ```
- Implement rate limiting on auth endpoints
- Add CSRF protection for state-changing operations
- Regular dependency updates (`npm audit`)
- Monitor for security vulnerabilities
- Use environment-specific secrets

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Run tests and linting
5. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
6. Push to the branch (`git push origin feature/AmazingFeature`)
7. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style
- Write meaningful commit messages (use conventional commits)
- Add proper TypeScript types
- Test your changes thoroughly
- Update documentation as needed
- Ensure both backend and frontend work together

## 👨‍💻 Author

**Ravi**
- GitHub: [@Ravi8043](https://github.com/Ravi8043)
- Repository: [movieWatchList](https://github.com/Ravi8043/movieWatchList)

## 🙏 Acknowledgments

- **Backend**: Express.js, Prisma, Zod
- **Frontend**: Next.js, TanStack Query, Tailwind CSS, Zustand
- **Community**: The amazing open-source community

## 📧 Support

If you encounter any issues or have questions:

- **Open an issue** on [GitHub Issues](https://github.com/Ravi8043/movieWatchList/issues)
- **Check existing issues** for similar problems
- **Provide details**: OS, Node version, error messages, steps to reproduce

## 📊 Project Stats

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Express, Prisma, JWT Auth
- **Database**: PostgreSQL/MySQL/SQLite
- **Code Quality**: ESLint, Prettier, TypeScript strict mode
- **Architecture**: Full-stack monorepo structure

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

**Made with ❤️ by [Ravi8043](https://github.com/Ravi8043)**

[Report Bug](https://github.com/Ravi8043/movieWatchList/issues) · [Request Feature](https://github.com/Ravi8043/movieWatchList/issues)

</div>
