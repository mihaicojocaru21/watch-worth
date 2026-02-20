import { toast } from 'react-toastify';
import MovieForm from '../components/admin/MovieForm';
import type { MovieFormData } from '../components/admin/MovieForm';
import MovieTable from '../components/admin/MovieTable';
import { useMovies } from '../hooks/useMovies';

const Admin = () => {
    const { movies, addMovie, deleteMovie } = useMovies();

    const onAdd = async (data: MovieFormData) => {
        await addMovie({
            ...data,
            description: 'No description.',
            rating: 0,
            image: 'https://via.placeholder.com/300x450?text=No+Image',
        });
        toast.success('Movie added!');
    };

    const onDelete = async (id: number) => {
        if (window.confirm('Delete this movie?')) {
            await deleteMovie(id);
            toast.info('Movie deleted');
        }
    };

    return (
        <div className="container mx-auto p-6 space-y-8">
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>

            <MovieForm onSubmit={onAdd} />
            <MovieTable movies={movies} onDelete={onDelete} />
        </div>
    );
};

export default Admin;