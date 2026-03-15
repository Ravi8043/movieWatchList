'use client';

import { useState, Suspense } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, Star, Calendar, Pencil, Trash2,
  BookmarkPlus, BookmarkCheck, CheckCircle, Clock, XCircle, Save, X,
} from 'lucide-react';
import { useMovie, useUpdateMovie, useRemoveMovie } from '@/hooks/useMovies';
import { useWatchlist, useAddToWatchlist, useUpdateWatchlistItem } from '@/hooks/useWatchlist';
import { MovieForm } from '@/components/movies/MovieForm';
import { Skeleton } from '@/components/ui/Skeletons';
import { ErrorState, ConfirmModal, LoadingSpinner } from '@/components/ui/States';
import { getStatusBadge, formatRating } from '@/lib/utils';
import type { MovieFormData, WatchlistUpdateFormData } from '@/lib/validations';
import { toast } from 'sonner';

function MovieDetailContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = Number(params.id);

  const isEditing = searchParams.get('edit') === '1';
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [watchlistStatus, setWatchlistStatus] = useState<'PLANNED' | 'WATCHED' | 'NOT_INTERESTED'>('PLANNED');

  const { data: movie, isLoading, error, refetch } = useMovie(id);
  const { data: watchlist } = useWatchlist();
  const updateMovie = useUpdateMovie(id);
  const removeMovie = useRemoveMovie();
  const addToWatchlist = useAddToWatchlist();

  const watchlistItem = watchlist?.find((w) => w.movieId === id);
  const updateWatchlistItem = useUpdateWatchlistItem(watchlistItem?.id || 0);

  const handleUpdate = async (data: MovieFormData) => {
    await updateMovie.mutateAsync(data);
    router.push(`/movies/${id}`);
  };

  const handleDelete = async () => {
    await removeMovie.mutateAsync(id);
    router.push('/movies');
    setDeleteOpen(false);
  };

  const handleAddToWatchlist = () => {
    addToWatchlist.mutate({ movieId: id, status: watchlistStatus });
  };

  const handleUpdateStatus = (status: 'PLANNED' | 'WATCHED' | 'NOT_INTERESTED') => {
    if (watchlistItem) {
      updateWatchlistItem.mutate({ status });
    }
  };

  if (isLoading) {
    return (
      <div className="container" style={{ maxWidth: 760, paddingTop: '2rem', paddingBottom: '3rem' }}>
        <Skeleton style={{ height: 36, width: 140, marginBottom: '1.5rem' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '2rem' }}>
          <Skeleton style={{ height: 340, borderRadius: 16 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Skeleton style={{ height: 40, width: '80%' }} />
            <Skeleton style={{ height: 24, width: '40%' }} />
            <Skeleton style={{ height: 24, width: '50%' }} />
            <Skeleton style={{ height: 100 }} />
          </div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="container" style={{ paddingTop: '2rem' }}>
        <ErrorState message="Movie not found or you don't have access." onRetry={() => refetch()} />
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="container" style={{ maxWidth: 640, paddingTop: '2rem', paddingBottom: '3rem' }}>
        <Link href={`/movies/${id}`} className="btn btn-ghost btn-sm" style={{ marginBottom: '1.5rem', gap: '0.4rem' }}>
          <ArrowLeft size={14} /> Cancel Edit
        </Link>
        <div className="card-flat">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: 'rgba(245, 158, 11, 0.12)', color: '#f59e0b',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Pencil size={20} />
            </div>
            <div>
              <h1 style={{ fontWeight: 800, fontSize: '1.375rem' }}>Edit Movie</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{movie.title}</p>
            </div>
          </div>
          <MovieForm defaultValues={movie} onSubmit={handleUpdate} isLoading={updateMovie.isPending} submitLabel="Save Changes" />
        </div>
      </div>
    );
  }

  const badge = watchlistItem ? getStatusBadge(watchlistItem.status) : null;

  return (
    <div className="container" style={{ maxWidth: 860, paddingTop: '2rem', paddingBottom: '3rem' }}>
      {/* Back */}
      <Link href="/movies" className="btn btn-ghost btn-sm" style={{ marginBottom: '1.5rem', gap: '0.4rem' }}>
        <ArrowLeft size={14} /> Back to Movies
      </Link>

      <div className="card-flat" style={{ padding: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '2rem', alignItems: 'start' }}>
          {/* Poster */}
          <div style={{
            background: 'var(--surface-2)', borderRadius: 16,
            aspectRatio: '2/3', display: 'flex', alignItems: 'center',
            justifyContent: 'center', flexDirection: 'column', gap: '0.5rem',
            color: 'var(--text-muted)', fontSize: '0.75rem',
          }}>
            <div style={{ fontSize: 48, opacity: 0.3 }}>🎬</div>
            <span style={{ textAlign: 'center', padding: '0 0.75rem' }}>{movie.title}</span>
          </div>

          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <h1 style={{ fontWeight: 900, fontSize: '1.75rem', lineHeight: 1.2, marginBottom: '0.75rem' }}>
                {movie.title}
              </h1>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Calendar size={15} /> {movie.year}
                </span>
                <span className="rating" style={{ fontSize: '1rem' }}>
                  <Star size={15} fill="currentColor" /> {formatRating(movie.rating)}/10
                </span>
                {badge && (
                  <span className={`badge ${badge.color}`}>{badge.label}</span>
                )}
              </div>
            </div>

            {movie.overview && (
              <div>
                <h3 style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Overview
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem' }}>
                  {movie.overview}
                </p>
              </div>
            )}

            {/* Watchlist notes */}
            {watchlistItem?.notes && (
              <div style={{
                background: 'var(--surface-2)', borderRadius: 10, padding: '0.875rem',
                borderLeft: '3px solid var(--accent)',
              }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                  &ldquo;{watchlistItem.notes}&rdquo;
                </p>
              </div>
            )}

            {/* Watchlist Status Quick Change */}
            {watchlistItem && (
              <div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: 600 }}>UPDATE STATUS</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {(['PLANNED', 'WATCHED', 'NOT_INTERESTED'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => handleUpdateStatus(s)}
                      disabled={updateWatchlistItem.isPending}
                      className={`btn btn-sm ${watchlistItem.status === s ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ gap: '0.3rem', opacity: watchlistItem.status === s ? 1 : 0.7 }}
                    >
                      {s === 'WATCHED' && <CheckCircle size={13} />}
                      {s === 'PLANNED' && <Clock size={13} />}
                      {s === 'NOT_INTERESTED' && <XCircle size={13} />}
                      {s.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              {!watchlistItem ? (
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <select
                    className="form-input form-select"
                    style={{ width: 'auto', minWidth: 160 }}
                    value={watchlistStatus}
                    onChange={(e) => setWatchlistStatus(e.target.value as typeof watchlistStatus)}
                  >
                    <option value="PLANNED">📋 Planned</option>
                    <option value="WATCHED">✅ Watched</option>
                    <option value="NOT_INTERESTED">❌ Not Interested</option>
                  </select>
                  <button
                    onClick={handleAddToWatchlist}
                    disabled={addToWatchlist.isPending}
                    className="btn btn-success"
                    style={{ gap: '0.4rem' }}
                  >
                    {addToWatchlist.isPending ? <LoadingSpinner size={16} /> : <BookmarkPlus size={16} />}
                    Add to Watchlist
                  </button>
                </div>
              ) : (
                <Link href={`/watchlist/${watchlistItem.id}`} className="btn btn-secondary" style={{ gap: '0.4rem' }}>
                  <BookmarkCheck size={16} /> View in Watchlist
                </Link>
              )}

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Link href={`/movies/${id}?edit=1`} className="btn btn-ghost" style={{ gap: '0.4rem' }}>
                  <Pencil size={15} /> Edit
                </Link>
                <button onClick={() => setDeleteOpen(true)} className="btn btn-danger" style={{ gap: '0.4rem' }}>
                  <Trash2 size={15} /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        open={deleteOpen}
        title="Delete Movie"
        description={`Delete "${movie.title}"? This will also remove it from all watchlists.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteOpen(false)}
        loading={removeMovie.isPending}
      />

      <style jsx>{`
        @media (max-width: 600px) {
          div[style*="grid-template-columns: 200px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function MovieDetailPage() {
  return (
    <Suspense fallback={<div className="container" style={{ paddingTop: '2rem' }}><LoadingSpinner size={32} /></div>}>
      <MovieDetailContent />
    </Suspense>
  );
}
