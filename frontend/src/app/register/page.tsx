'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Film, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { registerSchema, RegisterFormData } from '@/lib/validations';
import { authService } from '@/lib/services';
import { useAuthStore } from '@/store/authStore';
import { getErrorMessage } from '@/lib/utils';
import { LoadingSpinner } from '@/components/ui/States';
import { toast } from 'sonner';

export default function RegisterPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      const res = await authService.register(data.name, data.email, data.password);
      setUser(res.data.user);
      toast.success('Account created! Welcome to CineList 🎬');
      router.push('/');
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
            Create your account
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Start tracking your favorite movies
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="reg-name">Full Name</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <User size={16} />
              </div>
              <input
                id="reg-name"
                type="text"
                autoComplete="name"
                className={`form-input ${errors.name ? 'error' : ''}`}
                style={{ paddingLeft: '2.75rem' }}
                placeholder="John Doe"
                {...register('name')}
              />
            </div>
            {errors.name && <span className="form-error">{errors.name.message}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="reg-email">Email Address</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <Mail size={16} />
              </div>
              <input
                id="reg-email"
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
            <label className="form-label" htmlFor="reg-password">Password</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <Lock size={16} />
              </div>
              <input
                id="reg-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                className={`form-input ${errors.password ? 'error' : ''}`}
                style={{ paddingLeft: '2.75rem', paddingRight: '3rem' }}
                placeholder="Min. 6 characters"
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', padding: 0,
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <span className="form-error">{errors.password.message}</span>}
          </div>

          <button type="submit" className="btn btn-primary btn-lg" disabled={isLoading} style={{ marginTop: '0.5rem' }}>
            {isLoading ? <LoadingSpinner size={18} /> : 'Create Account'}
          </button>
        </form>

        <div className="divider" />
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
