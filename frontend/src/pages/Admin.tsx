import { useState } from 'react';
import { toast } from 'react-toastify';
import MovieForm from '../components/admin/MovieForm';
import type { MovieFormData } from '../components/admin/MovieForm';
import MovieTable from '../components/admin/MovieTable';
import { useMovies } from '../hooks/useMovies';
import type { Movie } from '../types';

const PLACEHOLDER_IMAGE = 'https://placehold.co/300x450/1f2937/6b7280?text=No+Poster';

const Admin = () => {
    const { movies, addMovie, updateMovie, deleteMovie } = useMovies();
    const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

    const onSubmit = async (data: MovieFormData) => {
        if (editingMovie) {
            await updateMovie(editingMovie.id, data);
            toast.success('Movie updated!');
            setEditingMovie(null);
            return;
        }

        await addMovie({
            ...data,
            description: data.description ?? 'No description available.',
            rating: data.rating ?? 7.0,
            image: data.image ?? PLACEHOLDER_IMAGE,
        });
        toast.success('Movie added!');
    };

    const onEdit = (movie: Movie) => setEditingMovie(movie);

    const onDelete = async (id: number) => {
        if (window.confirm('Delete this movie?')) {
            await deleteMovie(id);
            toast.info('Movie deleted');
        }
    };

    const onCancelEdit = () => setEditingMovie(null);

    return (
        <div className="container mx-auto p-6 space-y-8">
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>

            <MovieForm
                onSubmit={onSubmit}
                initialValues={editingMovie ? {
                    title: editingMovie.title,
                    year: editingMovie.year,
                    genre: editingMovie.genre,
                    rating: editingMovie.rating,
                    image: editingMovie.image,
                    description: editingMovie.description,
                } : undefined}
                submitLabel={editingMovie ? 'Update' : 'Add'}
                onCancel={editingMovie ? onCancelEdit : undefined}
            />

            <MovieTable movies={movies} onDelete={onDelete} onEdit={onEdit} />
        </div>
    );
};

export default Admin;