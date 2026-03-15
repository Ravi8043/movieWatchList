'use client';

import { Film } from 'lucide-react';

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Skeleton({ className = '', style }: SkeletonProps) {
  return <div className={`skeleton ${className}`} style={style} />;
}

export function MovieCardSkeleton() {
  return (
    <div className="movie-card" style={{ cursor: 'default' }}>
      <div className="movie-card-poster">
        <Skeleton style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, borderRadius: 0 }} />
      </div>
      <div className="movie-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Skeleton style={{ height: 20, width: '80%' }} />
        <Skeleton style={{ height: 16, width: '50%' }} />
        <Skeleton style={{ height: 16, width: '60%' }} />
      </div>
      <div className="movie-card-actions">
        <Skeleton style={{ height: 34, flex: 1 }} />
        <Skeleton style={{ height: 34, width: 34 }} />
        <Skeleton style={{ height: 34, width: 34 }} />
      </div>
    </div>
  );
}

export function WatchlistCardSkeleton() {
  return (
    <div className="card" style={{ cursor: 'default', display: 'flex', gap: '1rem' }}>
      <Skeleton style={{ width: 80, height: 116, flexShrink: 0, borderRadius: 8 }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Skeleton style={{ height: 20, width: '70%' }} />
        <Skeleton style={{ height: 16, width: '40%' }} />
        <Skeleton style={{ height: 16, width: '55%' }} />
        <Skeleton style={{ height: 16, width: '80%', marginTop: '0.25rem' }} />
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
          <Skeleton style={{ height: 32, width: 80 }} />
          <Skeleton style={{ height: 32, width: 32 }} />
          <Skeleton style={{ height: 32, width: 32 }} />
        </div>
      </div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="stat-card">
      <Skeleton style={{ width: 56, height: 56, borderRadius: 14, flexShrink: 0 }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
        <Skeleton style={{ height: 32, width: '50%' }} />
        <Skeleton style={{ height: 14, width: '70%' }} />
      </div>
    </div>
  );
}

export function MoviePosterPlaceholder({ title }: { title: string }) {
  return (
    <div className="movie-card-poster-placeholder" style={{ width: '100%', height: '100%' }}>
      <Film size={40} style={{ opacity: 0.3 }} />
      <span style={{ textAlign: 'center', padding: '0 0.5rem', fontSize: '0.7rem', opacity: 0.5 }}>
        {title}
      </span>
    </div>
  );
}
