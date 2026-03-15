import Link from 'next/link';
import { Film, BookMarked, LayoutDashboard, ArrowRight, Star, Plus } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CineList – Track Movies You Love',
};

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.4rem 1rem', borderRadius: 999,
            background: 'rgba(108, 99, 255, 0.12)',
            border: '1px solid rgba(108, 99, 255, 0.3)',
            color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 600,
            marginBottom: '1.5rem', letterSpacing: '0.05em',
          }}>
            <Star size={12} fill="currentColor" /> Your Personal Cinema Tracker
          </div>

          <h1 className="hero-title" style={{ marginBottom: '1.5rem' }}>
            Track Every Movie<br />You've Ever Loved
          </h1>

          <p style={{
            fontSize: '1.125rem', color: 'var(--text-secondary)',
            maxWidth: 560, margin: '0 auto 2.5rem',
          }}>
            Build your movie database, manage your personal watchlist, and never lose track of what to watch next.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/movies" className="btn btn-primary btn-lg pulse-accent">
              <Film size={18} /> Browse Movies
            </Link>
            <Link href="/movies/add" className="btn btn-secondary btn-lg">
              <Plus size={18} /> Add a Movie
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontWeight: 800, fontSize: '1.75rem', marginBottom: '2.5rem' }}>
            Everything you need to manage your cinematic journey
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {[
              {
                icon: <Film size={28} />,
                color: '#6c63ff',
                bg: 'rgba(108, 99, 255, 0.1)',
                title: 'Movie Database',
                description: 'Add movies with title, year, rating, and overview. Search and filter your collection easily.',
                href: '/movies',
                cta: 'Browse Movies',
              },
              {
                icon: <BookMarked size={28} />,
                color: '#22c55e',
                bg: 'rgba(34, 197, 94, 0.1)',
                title: 'Personal Watchlist',
                description: 'Track movies as Planned, Watched, or Not Interested. Add personal notes to each entry.',
                href: '/watchlist',
                cta: 'My Watchlist',
              },
              {
                icon: <LayoutDashboard size={28} />,
                color: '#f59e0b',
                bg: 'rgba(245, 158, 11, 0.1)',
                title: 'Dashboard',
                description: 'Get a bird\'s-eye view of your watchlist stats and recent activity.',
                href: '/dashboard',
                cta: 'View Dashboard',
              },
            ].map((feature) => (
              <div key={feature.title} className="card" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 18,
                  background: feature.bg, color: feature.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1.5rem', fontSize: '1.5rem',
                }}>
                  {feature.icon}
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1.125rem', marginBottom: '0.75rem' }}>{feature.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {feature.description}
                </p>
                <Link href={feature.href} className="btn btn-secondary btn-sm" style={{ gap: '0.4rem' }}>
                  {feature.cta} <ArrowRight size={13} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Add CTA */}
      <section style={{
        padding: '3rem 0',
        borderTop: '1px solid var(--border)',
        background: 'var(--surface)',
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.75rem' }}>
            Ready to start tracking?
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Add your first movie to the database and get started.
          </p>
          <Link href="/movies/add" className="btn btn-primary btn-lg">
            <Plus size={18} /> Add Your First Movie
          </Link>
        </div>
      </section>
    </div>
  );
}
