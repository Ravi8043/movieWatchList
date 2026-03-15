'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Film, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { loginSchema, LoginFormData } from '@/lib/validations';
import { authService } from '@/lib/services';
import { useAuthStore } from '@/store/authStore';
import { getErrorMessage } from '@/lib/utils';
import { LoadingSpinner } from '@/components/ui/States';
import { toast } from 'sonner';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      const res = await authService.login(data.email, data.password);
      setUser(res.data.user);
      toast.success(`Welcome back, ${res.data.user.name || res.data.user.email}!`);
      const redirect = searchParams.get('redirect') || '/';
      router.push(redirect);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background: 'var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1rem',
            boxShadow: '0 8px 24px var(--accent-glow)',
          }}>
            <Film size={28} color="white" />
          </div>
          <h1 style={{ fontWeight: 800, fontSize: '1.625rem', marginBottom: '0.375rem' }}>
            Welcome back
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Sign in to your CineList account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="login-email">Email Address</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <Mail size={16} />
              </div>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                style={{ paddingLeft: '2.75rem' }}
                placeholder="you@example.com"
                {...register('email')}
              />
            </div>
            {errors.email && <span className="form-error">{errors.email.message}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="login-password">Password</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <Lock size={16} />
              </div>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                className={`form-input ${errors.password ? 'error' : ''}`}
                style={{ paddingLeft: '2.75rem', paddingRight: '3rem' }}
                placeholder="••••••••"
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)',
                  display: 'flex', padding: 0,
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <span className="form-error">{errors.password.message}</span>}
          </div>

          <button type="submit" className="btn btn-primary btn-lg" disabled={isLoading} style={{ marginTop: '0.5rem' }}>
            {isLoading ? <LoadingSpinner size={18} /> : 'Sign In'}
          </button>
        </form>

        <div className="divider" />
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          Don&apos;t have an account?{' '}
          <Link href="/register" style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="auth-page"><LoadingSpinner size={32} /></div>}>
      <LoginForm />
    </Suspense>
  );
}
