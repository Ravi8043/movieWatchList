# CineList - Movie Watchlist

A modern, responsive Next.js frontend for managing your movie database and personal watchlist. Built with Next.js 15, TypeScript, Tailwind CSS, TanStack Query, and Zustand.

## Features

- **Authentication:** Secure login and registration with HTTP-only cookies.
- **Movie Database:** Browse, add, view, and organize movies.
- **Personal Watchlist:** Track movies as Planned, Watched, or Not Interested, and keep private notes.
- **Dashboard:** Visualize your watchlist status with statistics.
- **Design:** Modern dark-mode aesthetic with custom animations and smooth UI.

## Technology Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS + Vanilla CSS (Custom Design System)
- **State Management:** Zustand (Auth)
- **Data Fetching:** Axios + TanStack React Query (v5)
- **Form Handling:** React Hook Form + Zod validation
- **Notifications:** Sonner
- **Icons:** Lucide React

## Setup Instructions

### 1. Backend Preparation

Make sure your backend is running.
The frontend uses Next.js app rewrites to proxy requests to your backend (which solves CORS issues without modifying backend code).

1. Clone or start the `movieWatchList` backend API.
2. Verify it is running properly on `http://localhost:5000`.

### 2. Frontend Setup

1. Open a terminal in the `frontend` folder.
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Set up the `.env.local` file. An `.env.example` has been provided. By default, it uses the backend fallback configuration in `next.config.ts`.
   ```bash
   cp .env.example .env.local
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:3000`.

### Troubleshooting

- **CORS Errors:** Ensure that you are making requests to `/api/*` so the Next.js rewrite works properly.
- **Auth Missing:** Verify your backend JWT secret and HTTP-only cookie configuration allows sessions.
