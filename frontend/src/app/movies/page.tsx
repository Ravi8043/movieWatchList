'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Film, Search, Plus, SlidersHorizontal } from 'lucide-react';
import { useMovies } from '@/hooks/useMovies';
import { useWatchlist } from '@/hooks/useWatchlist';
import { MovieCard } from '@/components/movies/MovieCard';
import { MovieCardSkeleton } from '@/components/ui/Skeletons';
import { ErrorState, EmptyState } from '@/components/ui/States';
import type { Metadata } from 'next';

export default function MoviesPage() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'title' | 'year' | 'rating'>('title');

  const { data: movies, isLoading, error, refetch } = useMovies();
  const { data: watchlist } = useWatchlist();

  const watchlistMap = new Map(watchlist?.map((item) => [item.movieId, item]) || []);

  const filtered = (movies || [])
    .filter((m) =>
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      (m.overview || '').toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'year') return b.year - a.year;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <div>
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <div className="flex-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 className="page-title">Movie Database</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                {movies ? `${movies.length} movie${movies.length !== 1 ? 's' : ''} in your collection` : 'Your personal film library'}
              </p>
            </div>
            <Link href="/movies/add" className="btn btn-primary" style={{ gap: '0.5rem' }}>
              <Plus size={16} /> Add Movie
            </Link>
          </div>
        </div>

        {/* Search & Filter */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <div className="search-bar" style={{ flex: 1, minWidth: 200 }}>
            <div className="search-icon"><Search size={16} /></div>
            <input
              type="text"
              id="movie-search"
              className="form-input"
              style={{ paddingLeft: '2.75rem' }}
              placeholder="Search movies by title or overview..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <SlidersHorizontal size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            <select
              id="movie-sort"
              className="form-input form-select"
              style={{ width: 'auto', minWidth: 140, paddingRight: '2.5rem' }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            >
              <option value="title">Sort by Title</option>
              <option value="year">Sort by Year</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <ErrorState
            message="Failed to load movies. Make sure the backend is running."
            onRetry={() => refetch()}
          />
        )}

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="movies-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filtered.length === 0 && (
          <EmptyState
            icon={<Film size={36} />}
            title={search ? 'No movies found' : 'No movies yet'}
            description={
              search
                ? `No movies matching "${search}". Try a different search.`
                : 'Start building your movie database by adding your first movie.'
            }
            action={
              !search ? (
                <Link href="/movies/add" className="btn btn-primary">
                  <Plus size={16} /> Add Your First Movie
                </Link>
              ) : undefined
            }
          />
        )}

        {/* Movies Grid */}
        {!isLoading && filtered.length > 0 && (
          <div className="movies-grid">
            {filtered.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                watchlistItem={watchlistMap.get(movie.id)}
              />
            ))}
          </div>
        )}

        {/* Bottom padding */}
        <div style={{ height: '3rem' }} />
      </div>
    </div>
  );
}
