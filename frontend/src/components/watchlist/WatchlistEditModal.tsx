'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { watchlistUpdateSchema, WatchlistUpdateFormData } from '@/lib/validations';
import { LoadingSpinner } from '@/components/ui/States';
import type { WatchlistItem } from '@/types';

interface WatchlistEditModalProps {
  item: WatchlistItem;
  onSave: (data: WatchlistUpdateFormData) => Promise<void>;
  onClose: () => void;
  isLoading?: boolean;
}

export function WatchlistEditModal({ item, onSave, onClose, isLoading }: WatchlistEditModalProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<WatchlistUpdateFormData>({
    resolver: zodResolver(watchlistUpdateSchema),
    defaultValues: {
      status: item.status,
      notes: item.notes || '',
    },
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 500 }} onClick={(e) => e.stopPropagation()}>
        <h3 style={{ fontWeight: 700, fontSize: '1.125rem', marginBottom: '1.5rem' }}>
          Edit: {item.movie.title}
        </h3>

        <form onSubmit={handleSubmit(onSave)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select className={`form-input form-select ${errors.status ? 'error' : ''}`} {...register('status')}>
              <option value="PLANNED">📋 Planned</option>
              <option value="WATCHED">✅ Watched</option>
              <option value="NOT_INTERESTED">❌ Not Interested</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Notes</label>
            <textarea
              className="form-input form-textarea"
              placeholder="Add your thoughts about this movie..."
              rows={3}
              {...register('notes')}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary" disabled={isLoading}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={isLoading} style={{ minWidth: 80 }}>
              {isLoading ? <LoadingSpinner size={16} /> : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
