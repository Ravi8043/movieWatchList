'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, PlusCircle } from 'lucide-react';
import { MovieForm } from '@/components/movies/MovieForm';
import { useAddMovie } from '@/hooks/useMovies';
import type { MovieFormData } from '@/lib/validations';

export default function AddMoviePage() {
  const router = useRouter();
  const addMovie = useAddMovie();

  const onSubmit = async (data: MovieFormData) => {
    const movie = await addMovie.mutateAsync({
      title: data.title,
      year: data.year,
      rating: data.rating,
      overview: data.overview,
    });
    router.push(`/movies/${movie.id}`);
  };

  return (
    <div className="container" style={{ maxWidth: 640, paddingTop: '2rem', paddingBottom: '3rem' }}>
      {/* Breadcrumb */}
      <Link href="/movies" className="btn btn-ghost btn-sm" style={{ marginBottom: '1.5rem', gap: '0.4rem' }}>
        <ArrowLeft size={14} /> Back to Movies
      </Link>

      <div className="card-flat">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: 'var(--accent-glow)', color: 'var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <PlusCircle size={22} />
          </div>
          <div>
            <h1 style={{ fontWeight: 800, fontSize: '1.375rem' }}>Add New Movie</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Add a movie to your database</p>
          </div>
        </div>

        <MovieForm
          onSubmit={onSubmit}
          isLoading={addMovie.isPending}
          submitLabel="Add Movie"
        />
      </div>
    </div>
  );
}
