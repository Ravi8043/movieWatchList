'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Star, Pencil, Trash2, Eye, CheckCircle, Clock, XCircle } from 'lucide-react';
import type { WatchlistItem } from '@/types';
import { getStatusBadge, formatRating } from '@/lib/utils';
import { ConfirmModal } from '@/components/ui/States';
import { useRemoveFromWatchlist } from '@/hooks/useWatchlist';
import { MoviePosterPlaceholder } from '@/components/ui/Skeletons';

const StatusIcon = ({ status }: { status: string }) => {
  if (status === 'WATCHED') return <CheckCircle size={13} />;
  if (status === 'PLANNED') return <Clock size={13} />;
  return <XCircle size={13} />;
};

interface WatchlistCardProps {
  item: WatchlistItem;
  onEdit?: (item: WatchlistItem) => void;
}

export function WatchlistCard({ item, onEdit }: WatchlistCardProps) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const removeFromWatchlist = useRemoveFromWatchlist();
  const badge = getStatusBadge(item.status);

  const handleDelete = async () => {
    await removeFromWatchlist.mutateAsync(item.movieId);
    setDeleteOpen(false);
  };

  return (
    <>
      <div className="card" style={{ display: 'flex', gap: '1rem', cursor: 'default', padding: '1rem' }}>
        {/* Poster */}
        <div style={{
          width: 80, minHeight: 116, borderRadius: 10, overflow: 'hidden',
          flexShrink: 0, background: 'var(--surface-2)', position: 'relative',
        }}>
          <MoviePosterPlaceholder title={item.movie.title} />
        </div>

        {/* Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.375rem', minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
            <h3 style={{ fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.3 }} className="truncate-2">
              {item.movie.title}
            </h3>
            <span className={`badge ${badge.color}`} style={{ flexShrink: 0 }}>
              <StatusIcon status={item.status} />
              {badge.label}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <span>{item.movie.year}</span>
            <span className="rating">
              <Star size={12} fill="currentColor" />
              {formatRating(item.movie.rating)}
            </span>
          </div>

          {item.notes && (
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '0.25rem' }} className="truncate-2">
              &ldquo;{item.notes}&rdquo;
            </p>
          )}

          <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', paddingTop: '0.5rem' }}>
            <Link href={`/watchlist/${item.id}`} className="btn btn-secondary btn-sm" style={{ gap: '0.3rem' }}>
              <Eye size={13} /> Details
            </Link>
            {onEdit && (
              <button onClick={() => onEdit(item)} className="btn btn-ghost btn-sm btn-icon" title="Edit notes/status">
                <Pencil size={13} />
              </button>
            )}
            <button
              onClick={() => setDeleteOpen(true)}
              className="btn btn-danger btn-sm btn-icon"
              title="Remove from watchlist"
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>
      </div>

      <ConfirmModal
        open={deleteOpen}
        title="Remove from Watchlist"
        description={`Remove "${item.movie.title}" from your watchlist?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteOpen(false)}
        loading={removeFromWatchlist.isPending}
      />
    </>
  );
}
