import { WatchListStatus } from '@/types';

export function getStatusBadge(status: WatchListStatus) {
  const map = {
    PLANNED: { label: 'Planned', color: 'badge-planned' },
    WATCHED: { label: 'Watched', color: 'badge-watched' },
    NOT_INTERESTED: { label: 'Not Interested', color: 'badge-not-interested' },
  };
  return map[status];
}

export function formatYear(year: number): string {
  return year.toString();
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

export function getErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as { response?: { data?: { message?: string } } };
    return axiosError.response?.data?.message || 'An unexpected error occurred';
  }
  if (error instanceof Error) return error.message;
  return 'An unexpected error occurred';
}
