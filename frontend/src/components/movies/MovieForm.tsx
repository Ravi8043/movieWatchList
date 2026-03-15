'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { movieSchema, MovieFormData } from '@/lib/validations';
import { LoadingSpinner } from '@/components/ui/States';
import type { Movie } from '@/types';

interface MovieFormProps {
  defaultValues?: Partial<Movie>;
  onSubmit: (data: MovieFormData) => Promise<void>;
  isLoading?: boolean;
  submitLabel?: string;
}

export function MovieForm({ defaultValues, onSubmit, isLoading, submitLabel = 'Save Movie' }: MovieFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MovieFormData>({
    resolver: zodResolver(movieSchema) as any,
    defaultValues: {
      title: defaultValues?.title || '',
      year: defaultValues?.year || new Date().getFullYear(),
      rating: defaultValues?.rating || 7,
      overview: defaultValues?.overview || '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div className="form-group">
        <label className="form-label" htmlFor="title">Movie Title *</label>
        <input
          id="title"
          className={`form-input ${errors.title ? 'error' : ''}`}
          placeholder="e.g. Inception"
          {...register('title')}
        />
        {errors.title && <span className="form-error">{errors.title.message}</span>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="form-group">
          <label className="form-label" htmlFor="year">Release Year *</label>
          <input
            id="year"
            type="number"
            className={`form-input ${errors.year ? 'error' : ''}`}
            placeholder="e.g. 2010"
            {...register('year')}
          />
          {errors.year && <span className="form-error">{errors.year.message}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="rating">Rating (0–10) *</label>
          <input
            id="rating"
            type="number"
            step="0.1"
            className={`form-input ${errors.rating ? 'error' : ''}`}
            placeholder="e.g. 8.8"
            {...register('rating')}
          />
          {errors.rating && <span className="form-error">{errors.rating.message}</span>}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="overview">Overview / Description</label>
        <textarea
          id="overview"
          className={`form-input form-textarea ${errors.overview ? 'error' : ''}`}
          placeholder="Brief description of the movie..."
          rows={4}
          {...register('overview')}
        />
        {errors.overview && <span className="form-error">{errors.overview.message}</span>}
      </div>

      <button type="submit" className="btn btn-primary btn-lg" disabled={isLoading}>
        {isLoading ? <LoadingSpinner size={18} /> : submitLabel}
      </button>
    </form>
  );
}
