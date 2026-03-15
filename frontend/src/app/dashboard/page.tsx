'use client';

import Link from 'next/link';
import { Film, BookMarked, CheckCircle, Clock, XCircle, LayoutDashboard, Plus, ArrowRight } from 'lucide-react';
import { useWatchlist } from '@/hooks/useWatchlist';
import { useMovies } from '@/hooks/useMovies';
import { useAuthStore } from '@/store/authStore';
import { StatCardSkeleton, WatchlistCardSkeleton } from '@/components/ui/Skeletons';
import { WatchlistCard } from '@/components/watchlist/WatchlistCard';
import { ErrorState } from '@/components/ui/States';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { data: watchlist, isLoading: watchlistLoading, error: watchlistError } = useWatchlist();
  const { data: movies, isLoading: moviesLoading } = useMovies();

  const totalMovies = movies?.length || 0;
  const totalWatchlist = watchlist?.length || 0;
  const watched = watchlist?.filter((w) => w.status === 'WATCHED').length || 0;
  const planned = watchlist?.filter((w) => w.status === 'PLANNED').length || 0;
  const notInterested = watchlist?.filter((w) => w.status === 'NOT_INTERESTED').length || 0;

  const recentWatchlist = (watchlist || [])
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  const stats = [
    {
      label: 'Movies in Database',
      value: totalMovies,
      icon: <Film size={24} />,
      color: '#6c63ff',
      bg: 'rgba(108, 99, 255, 0.12)',
      href: '/movies',
    },
    {
      label: 'Watchlist Total',
      value: totalWatchlist,
      icon: <BookMarked size={24} />,
      color: '#22c55e',
      bg: 'rgba(34, 197, 94, 0.1)',
      href: '/watchlist',
    },
    {
      label: 'Movies Watched',
      value: watched,
      icon: <CheckCircle size={24} />,
      color: '#22c55e',
      bg: 'rgba(34, 197, 94, 0.1)',
      href: '/watchlist?filter=WATCHED',
    },
    {
      label: 'To Watch (Planned)',
      value: planned,
      icon: <Clock size={24} />,
      color: '#f59e0b',
      bg: 'rgba(245, 158, 11, 0.1)',
      href: '/watchlist?filter=PLANNED',
    },
  ];

  return (
    <div>
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px var(--accent-glow)',
            }}>
              <LayoutDashboard size={22} color="white" />
            </div>
            <div>
              <h1 className="page-title" style={{ fontSize: '1.75rem' }}>Dashboard</h1>
              {user && (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                  Welcome back, <strong style={{ color: 'var(--text-secondary)' }}>{user.name || user.email}</strong>!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
          {(watchlistLoading || moviesLoading)
            ? Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
            : stats.map((stat) => (
                <Link key={stat.label} href={stat.href} style={{ textDecoration: 'none' }}>
                  <div className="stat-card" style={{ cursor: 'pointer' }}>
                    <div className="stat-icon" style={{ background: stat.bg, color: stat.color }}>
                      {stat.icon}
                    </div>
                    <div>
                      <div className="stat-value" style={{ color: stat.color }}>{stat.value}</div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  </div>
                </Link>
              ))
          }
        </div>

        {/* Progress */}
        {!watchlistLoading && totalWatchlist > 0 && (
          <div className="card-flat" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
            <h2 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1rem' }}>Watchlist Progress</h2>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
              {watched > 0 && (
                <div style={{
                  flex: watched, background: 'var(--watched)',
                  height: 10, borderRadius: 5, transition: 'flex 0.5s ease',
                }} />
              )}
              {planned > 0 && (
                <div style={{
                  flex: planned, background: '#f59e0b',
                  height: 10, borderRadius: 5, transition: 'flex 0.5s ease',
                }} />
              )}
              {notInterested > 0 && (
                <div style={{
                  flex: notInterested, background: 'var(--not-interested)',
                  height: 10, borderRadius: 5, transition: 'flex 0.5s ease',
                }} />
              )}
            </div>
            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--watched)' }} />
                Watched ({watched})
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: '#f59e0b' }} />
                Planned ({planned})
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--not-interested)' }} />
                Not Interested ({notInterested})
              </span>
            </div>
          </div>
        )}

        {/* Recent Watchlist */}
        <div style={{ marginBottom: '2rem' }}>
          <div className="flex-between" style={{ marginBottom: '1rem' }}>
            <h2 style={{ fontWeight: 700, fontSize: '1.125rem' }}>Recent Watchlist Activity</h2>
            <Link href="/watchlist" className="btn btn-ghost btn-sm" style={{ gap: '0.4rem' }}>
              View All <ArrowRight size={13} />
            </Link>
          </div>

          {watchlistError && <ErrorState message="Failed to load watchlist data." />}

          {watchlistLoading && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {Array.from({ length: 3 }).map((_, i) => <WatchlistCardSkeleton key={i} />)}
            </div>
          )}

          {!watchlistLoading && recentWatchlist.length === 0 && (
            <div className="card-flat" style={{ textAlign: 'center', padding: '2.5rem' }}>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>No watchlist items yet.</p>
              <Link href="/movies" className="btn btn-primary btn-sm">
                <Plus size={14} /> Browse Movies
              </Link>
            </div>
          )}

          {!watchlistLoading && recentWatchlist.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {recentWatchlist.map((item) => (
                <WatchlistCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="card-flat" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1rem' }}>Quick Actions</h2>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link href="/movies/add" className="btn btn-primary" style={{ gap: '0.4rem' }}>
              <Plus size={16} /> Add Movie
            </Link>
            <Link href="/movies" className="btn btn-secondary" style={{ gap: '0.4rem' }}>
              <Film size={16} /> Browse Movies
            </Link>
            <Link href="/watchlist" className="btn btn-secondary" style={{ gap: '0.4rem' }}>
              <BookMarked size={16} /> My Watchlist
            </Link>
          </div>
        </div>

        <div style={{ height: '3rem' }} />
      </div>
    </div>
  );
}
