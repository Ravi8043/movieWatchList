'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { movieService } from '@/lib/services';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/utils';

export function useMovies() {
  return useQuery({
    queryKey: ['movies'],
    queryFn: movieService.getAll,
  });
}

export function useMovie(id: number) {
  return useQuery({
    queryKey: ['movies', id],
    queryFn: () => movieService.getOne(id),
    enabled: !!id,
  });
}

export function useAddMovie() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: movieService.add,
    onSuccess: (movie) => {
      qc.invalidateQueries({ queryKey: ['movies'] });
      toast.success(`"${movie.title}" added successfully!`);
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });
}

export function useUpdateMovie(id: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Parameters<typeof movieService.update>[1]) =>
      movieService.update(id, data),
    onSuccess: (movie) => {
      qc.invalidateQueries({ queryKey: ['movies'] });
      qc.invalidateQueries({ queryKey: ['movies', id] });
      toast.success(`"${movie.title}" updated!`);
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });
}

export function useRemoveMovie() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: movieService.remove,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['movies'] });
      toast.success('Movie deleted');
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });
}
