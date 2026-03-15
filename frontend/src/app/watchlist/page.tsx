'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookMarked, Plus, Filter } from 'lucide-react';
import { useWatchlist, useUpdateWatchlistItem } from '@/hooks/useWatchlist';
import { WatchlistCard } from '@/components/watchlist/WatchlistCard';
import { WatchlistEditModal } from '@/components/watchlist/WatchlistEditModal';
import { WatchlistCardSkeleton } from '@/components/ui/Skeletons';
import { ErrorState, EmptyState } from '@/components/ui/States';
import type { WatchlistItem } from '@/types';
import type { WatchlistUpdateFormData } from '@/lib/validations';

export default function WatchlistPage() {
  const [filter, setFilter] = useState<'ALL' | 'PLANNED' | 'WATCHED' | 'NOT_INTERESTED'>('ALL');
  const [editingItem, setEditingItem] = useState<WatchlistItem | null>(null);

  const { data: watchlist, isLoading, error, refetch } = useWatchlist();
  const updateWatchlistItem = useUpdateWatchlistItem(editingItem?.id || 0);

  const filtered = (watchlist || []).filter((item) => filter === 'ALL' || item.status === filter);

  const handleSaveEdit = async (data: WatchlistUpdateFormData) => {
    if (!editingItem) return;
    await updateWatchlistItem.mutateAsync(data);
    setEditingItem(null);
  };

  const counts = {
    ALL: watchlist?.length || 0,
    PLANNED: watchlist?.filter((w) => w.status === 'PLANNED').length || 0,
    WATCHED: watchlist?.filter((w) => w.status === 'WATCHED').length || 0,
    NOT_INTERESTED: watchlist?.filter((w) => w.status === 'NOT_INTERESTED').length || 0,
  };

  return (
    <div>
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <div className="flex-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 className="page-title">My Watchlist</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                {watchlist ? `${watchlist.length} movie${watchlist.length !== 1 ? 's' : ''} in your watchlist` : 'Your personal movie tracker'}
              </p>
            </div>
            <Link href="/movies" className="btn btn-primary" style={{ gap: '0.5rem' }}>
              <Plus size={16} /> Add from Movies
            </Link>
          </div>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {(['ALL', 'PLANNED', 'WATCHED', 'NOT_INTERESTED'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`btn btn-sm ${filter === status ? 'btn-primary' : 'btn-secondary'}`}
              id={`filter-${status.toLowerCase()}`}
            >
              {status === 'ALL' ? '📋 All' : status === 'PLANNED' ? '🕐 Planned' : status === 'WATCHED' ? '✅ Watched' : '❌ Not Interested'}
              <span style={{
                marginLeft: '0.25rem',
                background: filter === status ? 'rgba(255,255,255,0.2)' : 'var(--surface-3)',
                borderRadius: 999, padding: '0.1rem 0.45rem',
                fontSize: '0.7rem', fontWeight: 700,
              }}>
                {counts[status]}
              </span>
            </button>
          ))}
        </div>

        {/* Error State */}
        {error && (
          <ErrorState
            message="Failed to load watchlist. Make sure the backend is running."
            onRetry={() => refetch()}
          />
        )}

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="watchlist-grid">
            {Array.from({ length: 6 }).map((_, i) => <WatchlistCardSkeleton key={i} />)}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filtered.length === 0 && (
          <EmptyState
            icon={<BookMarked size={36} />}
            title={filter === 'ALL' ? 'Your watchlist is empty' : `No ${filter.replace('_', ' ').toLowerCase()} movies`}
            description={
              filter === 'ALL'
                ? 'Go to the movies page and add films to your watchlist to get started.'
                : `You have no movies with "${filter.replace('_', ' ')}" status.`
            }
            action={
              filter === 'ALL' ? (
                <Link href="/movies" className="btn btn-primary">
                  <Plus size={16} /> Browse Movies
                </Link>
              ) : undefined
            }
          />
        )}

        {/* Watchlist Grid */}
        {!isLoading && filtered.length > 0 && (
          <div className="watchlist-grid">
            {filtered.map((item) => (
              <WatchlistCard key={item.id} item={item} onEdit={setEditingItem} />
            ))}
          </div>
        )}

        <div style={{ height: '3rem' }} />
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <WatchlistEditModal
          item={editingItem}
          onSave={handleSaveEdit}
          onClose={() => setEditingItem(null)}
          isLoading={updateWatchlistItem.isPending}
        />
      )}
    </div>
  );
}
