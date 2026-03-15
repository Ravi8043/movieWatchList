'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Film, BookMarked, LayoutDashboard, LogOut, Sun, Moon, Menu, X, PlusCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/lib/services';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/utils';

const navItems = [
  { href: '/movies', label: 'Movies', icon: Film },
  { href: '/watchlist', label: 'My Watchlist', icon: BookMarked },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const isAuthPage = pathname === '/login' || pathname === '/register';

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await authService.logout();
      logout();
      toast.success('Logged out successfully');
      router.push('/login');
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoggingOut(false);
    }
  };

  if (isAuthPage) return null;

  return (
    <nav className="navbar">
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'var(--accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px var(--accent-glow)'
            }}>
              <Film size={20} color="white" />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-primary)' }}>
              Cine<span style={{ color: 'var(--accent)' }}>List</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          {isAuthenticated && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="desktop-nav">
              {navItems.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={`nav-link ${pathname.startsWith(href) ? 'active' : ''}`}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              ))}
            </div>
          )}

          {/* Right Side Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="btn btn-ghost btn-icon"
              aria-label="Toggle theme"
            >
              {mounted && (theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />)}
              {!mounted && <span style={{ width: 16, height: 16 }} />}
            </button>

            {isAuthenticated ? (
              <>
                <Link href="/movies/add" className="btn btn-primary btn-sm" style={{ gap: '0.375rem' }}>
                  <PlusCircle size={14} />
                  <span className="desktop-only">Add Movie</span>
                </Link>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.375rem 0.75rem',
                  background: 'var(--surface-2)',
                  borderRadius: 8,
                  border: '1px solid var(--border)',
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                }} className="desktop-only">
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%',
                    background: 'var(--accent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontSize: '0.75rem', fontWeight: 700,
                  }}>
                    {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}
                  </div>
                  {user?.name || user?.email?.split('@')[0]}
                </div>
                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="btn btn-ghost btn-icon"
                  title="Logout"
                >
                  <LogOut size={16} />
                </button>
              </>
            ) : (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Link href="/login" className="btn btn-secondary btn-sm">Sign In</Link>
                <Link href="/register" className="btn btn-primary btn-sm">Sign Up</Link>
              </div>
            )}

            {/* Mobile menu toggle */}
            {isAuthenticated && (
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="btn btn-ghost btn-icon mobile-menu-btn"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && isAuthenticated && (
          <div style={{
            borderTop: '1px solid var(--border)',
            padding: '0.75rem 0',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
          }}>
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`nav-link ${pathname.startsWith(href) ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
                style={{ justifyContent: 'flex-start' }}
              >
                <Icon size={16} />
                {label}
              </Link>
            ))}
            <div className="divider" style={{ margin: '0.5rem 0' }} />
            <button
              onClick={handleLogout}
              className="btn btn-ghost"
              style={{ justifyContent: 'flex-start', gap: '0.5rem', padding: '0.5rem 0.875rem' }}
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .desktop-nav { display: flex; }
        .desktop-only { display: flex; }
        .mobile-menu-btn { display: none; }

        @media (max-width: 768px) {
          .desktop-nav { display: none; }
          .desktop-only { display: none; }
          .mobile-menu-btn { display: flex; }
        }
      `}</style>
    </nav>
  );
}
