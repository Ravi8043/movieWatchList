'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Star, Eye, Pencil, Trash2, BookmarkPlus, BookmarkCheck } from 'lucide-react';
import type { Movie, WatchlistItem } from '@/types';
import { formatRating } from '@/lib/utils';
import { MoviePosterPlaceholder } from '@/components/ui/Skeletons';
import { ConfirmModal } from '@/components/ui/States';
import { useRemoveMovie } from '@/hooks/useMovies';
import { useAddToWatchlist, useRemoveFromWatchlist } from '@/hooks/useWatchlist';

interface MovieCardProps {
  movie: Movie;
  watchlistItem?: WatchlistItem;
  showActions?: boolean;
}

export function MovieCard({ movie, watchlistItem, showActions = true }: MovieCardProps) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const removeMovie = useRemoveMovie();
  const addToWatchlist = useAddToWatchlist();
  const removeFromWatchlist = useRemoveFromWatchlist();

  const inWatchlist = !!watchlistItem;

  const handleDelete = async () => {
    await removeMovie.mutateAsync(movie.id);
    setDeleteOpen(false);
  };

  const handleWatchlistToggle = () => {
    if (inWatchlist) {
      removeFromWatchlist.mutate(movie.id);
    } else {
      addToWatchlist.mutate({ movieId: movie.id, status: 'PLANNED' });
    }
  };

  return (
    <>
      <div className="movie-card">
        {/* Poster */}
        <div className="movie-card-poster">
          <Link href={`/movies/${movie.id}`} style={{ display: 'block', width: '100%', height: '100%' }}>
            <MoviePosterPlaceholder title={movie.title} />
          </Link>
          {/* Rating overlay */}
          <div style={{
            position: 'absolute', top: 8, right: 8,
            background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
            borderRadius: 8, padding: '0.2rem 0.5rem',
            display: 'flex', alignItems: 'center', gap: '0.25rem',
            fontSize: '0.8rem', fontWeight: 700, color: '#f59e0b',
          }}>
            <Star size={12} fill="#f59e0b" />
            {formatRating(movie.rating)}
          </div>
          {/* Watchlist badge */}
          {inWatchlist && (
            <div style={{
              position: 'absolute', top: 8, left: 8,
              background: 'var(--accent)', borderRadius: 8,
              padding: '0.2rem 0.4rem', fontSize: '0.65rem',
              fontWeight: 700, color: 'white', letterSpacing: '0.05em',
            }}>
              {watchlistItem.status.replace('_', ' ')}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="movie-card-body">
          <Link href={`/movies/${movie.id}`} style={{ textDecoration: 'none' }}>
            <h3 style={{
              fontWeight: 700, fontSize: '0.9rem',
              color: 'var(--text-primary)', marginBottom: '0.25rem',
            }} className="truncate-2">
              {movie.title}
            </h3>
          </Link>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{movie.year}</p>
          {movie.overview && (
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginTop: '0.375rem' }} className="truncate-2">
              {movie.overview}
            </p>
          )}
        </div>

        {/* Actions */}
        {showActions && (
          <div className="movie-card-actions">
            <Link href={`/movies/${movie.id}`} className="btn btn-secondary btn-sm" style={{ flex: 1, gap: '0.3rem' }}>
              <Eye size={13} /> View
            </Link>
            <button
              onClick={handleWatchlistToggle}
              disabled={addToWatchlist.isPending || removeFromWatchlist.isPending}
              className={`btn btn-sm btn-icon ${inWatchlist ? 'btn-success' : 'btn-ghost'}`}
              title={inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
            >
              {inWatchlist ? <BookmarkCheck size={14} /> : <BookmarkPlus size={14} />}
            </button>
            <Link href={`/movies/${movie.id}?edit=1`} className="btn btn-ghost btn-sm btn-icon" title="Edit">
              <Pencil size={14} />
            </Link>
            <button
              onClick={() => setDeleteOpen(true)}
              className="btn btn-danger btn-sm btn-icon"
              title="Delete"
            >
              <Trash2 size={14} />
            </button>
          </div>
        )}
      </div>

      <ConfirmModal
        open={deleteOpen}
        title="Delete Movie"
        description={`Are you sure you want to delete "${movie.title}"? This will also remove it from all watchlists.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteOpen(false)}
        loading={removeMovie.isPending}
      />
    </>
  );
}
