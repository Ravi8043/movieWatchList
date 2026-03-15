'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { watchlistService } from '@/lib/services';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/utils';
import type { WatchlistFormData, WatchlistUpdateData } from '@/types';

export function useWatchlist() {
  return useQuery({
    queryKey: ['watchlist'],
    queryFn: watchlistService.getAll,
  });
}

export function useWatchlistItem(id: number) {
  return useQuery({
    queryKey: ['watchlist', id],
    queryFn: () => watchlistService.getOne(id),
    enabled: !!id,
  });
}

export function useAddToWatchlist() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: WatchlistFormData) => watchlistService.add(data),
    onSuccess: (item) => {
      qc.invalidateQueries({ queryKey: ['watchlist'] });
      toast.success(`"${item.movie?.title}" added to watchlist!`);
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });
}

export function useUpdateWatchlistItem(id: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: WatchlistUpdateData) => watchlistService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['watchlist'] });
      qc.invalidateQueries({ queryKey: ['watchlist', id] });
      toast.success('Watchlist item updated!');
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });
}

export function useRemoveFromWatchlist() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (movieId: number) => watchlistService.remove(movieId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['watchlist'] });
      toast.success('Removed from watchlist');
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });
}
