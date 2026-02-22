import { useState } from 'react';
import { toast } from 'react-toastify';
import MovieForm from '../components/admin/MovieForm';
import type { MovieFormData } from '../components/admin/MovieForm';
import MovieTable from '../components/admin/MovieTable';
import { useMovies } from '../hooks/useMovies';
import type { Movie } from '../types';

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
            description: 'No description.',
            rating: 0,
            image: 'https://via.placeholder.com/300x450?text=No+Image',
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
                } : undefined}
                submitLabel={editingMovie ? 'Update' : 'Add'}
                onCancel={editingMovie ? onCancelEdit : undefined}
            />

            <MovieTable movies={movies} onDelete={onDelete} onEdit={onEdit} />
        </div>
    );
};

export default Admin;