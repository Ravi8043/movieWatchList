// ─── Enums ────────────────────────────────────────────────────────────────────
export type WatchListStatus = 'PLANNED' | 'WATCHED' | 'NOT_INTERESTED';

// ─── Models ───────────────────────────────────────────────────────────────────
export interface User {
  id: number;
  name: string;
  email: string;
  createdAt?: string;
}

export interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
  overview?: string | null;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface WatchlistItem {
  id: number;
  userId: number;
  movieId: number;
  status: WatchListStatus;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
  movie: Movie;
}

// ─── API Responses ────────────────────────────────────────────────────────────
export interface AuthResponse {
  status: string;
  data: {
    user: User;
    token: string;
  };
}

export interface ApiError {
  message: string;
  status?: string;
}

// ─── Form Payloads ────────────────────────────────────────────────────────────
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export interface MovieFormData {
  title: string;
  year: number;
  rating: number;
  overview?: string;
}

export interface WatchlistFormData {
  movieId: number;
  status?: WatchListStatus;
  notes?: string;
}

export interface WatchlistUpdateData {
  status?: WatchListStatus;
  notes?: string;
}
