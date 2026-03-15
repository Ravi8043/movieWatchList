import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required').min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const movieSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  year: z.coerce
    .number()
    .int()
    .min(1888, 'Year must be after 1888')
    .max(new Date().getFullYear() + 10, 'Year is too far in the future'),
  rating: z.coerce.number().min(0, 'Rating must be 0-10').max(10, 'Rating must be 0-10'),
  overview: z.string().optional(),
});

export const watchlistUpdateSchema = z.object({
  status: z.enum(['PLANNED', 'WATCHED', 'NOT_INTERESTED']).optional(),
  notes: z.string().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type MovieFormData = z.infer<typeof movieSchema>;
export type WatchlistUpdateFormData = z.infer<typeof watchlistUpdateSchema>;
