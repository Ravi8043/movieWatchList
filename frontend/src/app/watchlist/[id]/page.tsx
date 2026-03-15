'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Star, Calendar, CheckCircle, Clock, XCircle, Pencil, Trash2 } from 'lucide-react';
import { useWatchlistItem, useUpdateWatchlistItem, useRemoveFromWatchlist } from '@/hooks/useWatchlist';
import { WatchlistEditModal } from '@/components/watchlist/WatchlistEditModal';
import { Skeleton } from '@/components/ui/Skeletons';
import { ErrorState, ConfirmModal } from '@/components/ui/States';
import { getStatusBadge, formatRating } from '@/lib/utils';
import type { WatchlistUpdateFormData } from '@/lib/validations';

export default function WatchlistItemPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { data: item, isLoading, error, refetch } = useWatchlistItem(id);
  const updateItem = useUpdateWatchlistItem(id);
  const removeFromWatchlist = useRemoveFromWatchlist();

  const handleSaveEdit = async (data: WatchlistUpdateFormData) => {
    await updateItem.mutateAsync(data);
    setEditOpen(false);
  };

  const handleDelete = async () => {
    if (!item) return;
    await removeFromWatchlist.mutateAsync(item.movieId);
    router.push('/watchlist');
  };

  if (isLoading) {
    return (
      <div className="container" style={{ maxWidth: 640, paddingTop: '2rem', paddingBottom: '3rem' }}>
        <Skeleton style={{ height: 32, width: 140, marginBottom: '1.5rem' }} />
        <div className="card-flat" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Skeleton style={{ height: 28, width: '70%' }} />
          <Skeleton style={{ height: 20, width: '40%' }} />
          <Skeleton style={{ height: 80 }} />
          <Skeleton style={{ height: 20, width: '60%' }} />
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="container" style={{ paddingTop: '2rem' }}>
        <ErrorState message="Watchlist item not found." onRetry={() => refetch()} />
      </div>
    );
  }

  const badge = getStatusBadge(item.status);

  return (
    <div className="container" style={{ maxWidth: 640, paddingTop: '2rem', paddingBottom: '3rem' }}>
      <Link href="/watchlist" className="btn btn-ghost btn-sm" style={{ marginBottom: '1.5rem', gap: '0.4rem' }}>
        <ArrowLeft size={14} /> Back to Watchlist
      </Link>

      <div className="card-flat" style={{ padding: '2rem' }}>
        {/* Title & Status */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.25rem' }}>
          <h1 style={{ fontWeight: 900, fontSize: '1.5rem', lineHeight: 1.25 }}>{item.movie.title}</h1>
          <span className={`badge ${badge.color}`} style={{ flexShrink: 0, padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}>
            {item.status === 'WATCHED' && <CheckCircle size={14} />}
            {item.status === 'PLANNED' && <Clock size={14} />}
            {item.status === 'NOT_INTERESTED' && <XCircle size={14} />}
            {badge.label}
          </span>
        </div>

        {/* Movie Meta */}
        <div style={{ display: 'flex', gap: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Calendar size={15} /> {item.movie.year}
          </span>
          <span className="rating">
            <Star size={14} fill="currentColor" /> {formatRating(item.movie.rating)}/10
          </span>
        </div>

        {/* Movie Overview */}
        {item.movie.overview && (
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
              Overview
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.9rem' }}>{item.movie.overview}</p>
          </div>
        )}

        {/* Personal Notes */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
            My Notes
          </h3>
          {item.notes ? (
            <div style={{
              background: 'var(--surface-2)', borderRadius: 10, padding: '1rem',
              borderLeft: '3px solid var(--accent)',
            }}>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontStyle: 'italic' }}>
                &ldquo;{item.notes}&rdquo;
              </p>
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>No notes added yet.</p>
          )}
        </div>

        {/* Dates */}
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Added: {new Date(item.createdAt).toLocaleDateString('en-US', { dateStyle: 'medium' })}
          {item.updatedAt !== item.createdAt && (
            <> · Updated: {new Date(item.updatedAt).toLocaleDateString('en-US', { dateStyle: 'medium' })}</>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link href={`/movies/${item.movieId}`} className="btn btn-secondary" style={{ gap: '0.4rem' }}>
            View Movie
          </Link>
          <button onClick={() => setEditOpen(true)} className="btn btn-ghost" style={{ gap: '0.4rem' }}>
            <Pencil size={15} /> Edit
          </button>
          <button onClick={() => setDeleteOpen(true)} className="btn btn-danger" style={{ gap: '0.4rem' }}>
            <Trash2 size={15} /> Remove
          </button>
        </div>
      </div>

      {editOpen && (
        <WatchlistEditModal
          item={item}
          onSave={handleSaveEdit}
          onClose={() => setEditOpen(false)}
          isLoading={updateItem.isPending}
        />
      )}

      <ConfirmModal
        open={deleteOpen}
        title="Remove from Watchlist"
        description={`Remove "${item.movie.title}" from your watchlist?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteOpen(false)}
        loading={removeFromWatchlist.isPending}
      />
    </div>
  );
}
