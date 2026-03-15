import api from './api';
import type {
  AuthResponse,
  Movie,
  MovieFormData,
  WatchlistItem,
  WatchlistFormData,
  WatchlistUpdateData,
} from '@/types';

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const res = await api.post<AuthResponse>('/auth/login', { email, password });
    return res.data;
  },

  register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
    const res = await api.post<AuthResponse>('/auth/register', { name, email, password });
    return res.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },
};

// ─── Movies ───────────────────────────────────────────────────────────────────
export const movieService = {
  getAll: async (): Promise<Movie[]> => {
    const res = await api.get<Movie[]>('/movies');
    return res.data;
  },

  getOne: async (id: number): Promise<Movie> => {
    const res = await api.get<Movie>(`/movies/${id}`);
    return res.data;
  },

  add: async (data: MovieFormData): Promise<Movie> => {
    const res = await api.post<Movie>('/movies/add', data);
    return res.data;
  },

  update: async (id: number, data: Partial<MovieFormData>): Promise<Movie> => {
    const res = await api.put<Movie>(`/movies/update/${id}`, data);
    return res.data;
  },

  remove: async (id: number): Promise<void> => {
    await api.delete(`/movies/remove/${id}`);
  },
};

// ─── Watchlist ────────────────────────────────────────────────────────────────
export const watchlistService = {
  getAll: async (): Promise<WatchlistItem[]> => {
    const res = await api.get<WatchlistItem[]>('/watchlist');
    return res.data;
  },

  getOne: async (id: number): Promise<WatchlistItem> => {
    const res = await api.get<WatchlistItem>(`/watchlist/${id}`);
    return res.data;
  },

  add: async (data: WatchlistFormData): Promise<WatchlistItem> => {
    const res = await api.post<WatchlistItem>('/watchlist/add', data);
    return res.data;
  },

  update: async (id: number, data: WatchlistUpdateData): Promise<WatchlistItem> => {
    const res = await api.put<WatchlistItem>(`/watchlist/update/${id}`, data);
    return res.data;
  },

  // Note: backend uses movieId as :id param for delete
  remove: async (movieId: number): Promise<void> => {
    await api.delete(`/watchlist/delete/${movieId}`);
  },
};
