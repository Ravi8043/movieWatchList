'use client';

import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message = 'Something went wrong', onRetry }: ErrorStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon" style={{
        background: 'rgba(239, 68, 68, 0.1)',
        color: 'var(--danger)',
      }}>
        <AlertTriangle size={32} />
      </div>
      <div>
        <h3 style={{ fontWeight: 600, marginBottom: '0.375rem' }}>Error</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{message}</p>
      </div>
      {onRetry && (
        <button onClick={onRetry} className="btn btn-secondary" style={{ gap: '0.5rem' }}>
          <RefreshCw size={14} /> Try Again
        </button>
      )}
    </div>
  );
}

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>
      <div>
        <h3 style={{ fontWeight: 700, fontSize: '1.125rem', marginBottom: '0.375rem' }}>{title}</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: 320 }}>{description}</p>
      </div>
      {action}
    </div>
  );
}

export function LoadingSpinner({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ animation: 'spin 0.8s linear infinite' }}
    >
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.2" />
      <path
        d="M12 2 A10 10 0 0 1 22 12"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ConfirmModal({
  open,
  title,
  description,
  onConfirm,
  onCancel,
  loading,
  danger = true,
}: {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
  danger?: boolean;
}) {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: danger ? 'rgba(239, 68, 68, 0.1)' : 'var(--accent-glow)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: danger ? 'var(--danger)' : 'var(--accent)',
            flexShrink: 0,
          }}>
            <AlertTriangle size={20} />
          </div>
          <h3 style={{ fontWeight: 700, fontSize: '1.125rem' }}>{title}</h3>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          {description}
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <button onClick={onCancel} className="btn btn-secondary" disabled={loading}>
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`btn ${danger ? 'btn-danger' : 'btn-primary'}`}
            disabled={loading}
            style={{ minWidth: 80 }}
          >
            {loading ? <LoadingSpinner size={16} /> : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
}
