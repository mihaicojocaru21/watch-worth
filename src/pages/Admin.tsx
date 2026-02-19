import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Movie } from '../types';
import { movieService } from '../services/movieService';
import { toast } from 'react-toastify';

// 1. Schema de validare corectata (fara parametrul care dadea eroare)
const movieSchema = z.object({
    title: z.string().min(2, "Title too short"),
    year: z.number().min(1900).max(2030),
    genre: z.string().min(3, "Genre required")
});

type MovieForm = z.infer<typeof movieSchema>;

const Admin = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<MovieForm>({
        resolver: zodResolver(movieSchema)
    });

    const loadMovies = async () => {
        try {
            const data = await movieService.getAll();
            setMovies(data);
        } catch (error) {
            console.error("Failed to load movies");
        }
    };

    useEffect(() => {
        loadMovies();
    }, []);

    const onAdd = async (data: MovieForm) => {
        await movieService.create({
            ...data,
            description: 'No description.',
            rating: 0,
            image: 'https://via.placeholder.com/300x450?text=No+Image'
        });
        toast.success("Movie added!");
        reset();
        await loadMovies();
    };

    const onDelete = async (id: number) => {
        if (window.confirm("Delete this movie?")) {
            await movieService.delete(id);
            await loadMovies();
            toast.info("Movie deleted");
        }
    };

    return (
        <div className="container mx-auto p-6 space-y-8">
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>

            {/* FORMULAR */}
            <form onSubmit={handleSubmit(onAdd)} className="bg-gray-800 p-6 rounded-lg border border-gray-700 flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <input {...register("title")} placeholder="Title" className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600" />
                    {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
                </div>

                <div className="w-32">
                    <input {...register("year", { valueAsNumber: true })} type="number" placeholder="Year" className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600" />
                    {errors.year && <p className="text-red-500 text-xs">Invalid year</p>}
                </div>

                <div className="w-48">
                    <input {...register("genre")} placeholder="Genre" className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600" />
                    {errors.genre && <p className="text-red-500 text-xs">{errors.genre.message}</p>}
                </div>

                <button type="submit" className="bg-green-600 px-6 py-2 text-white rounded font-bold hover:bg-green-700">Add</button>
            </form>

            {/* TABEL */}
            <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                <table className="w-full text-left text-gray-300">
                    <thead className="bg-gray-700 text-gray-200">
                    <tr>
                        <th className="p-4">Title</th>
                        <th className="p-4">Year</th>
                        <th className="p-4">Genre</th>
                        <th className="p-4 text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {movies.map(movie => (
                        <tr key={movie.id} className="border-b border-gray-700">
                            <td className="p-4">{movie.title}</td>
                            <td className="p-4">{movie.year}</td>
                            <td className="p-4">{movie.genre}</td>
                            <td className="p-4 text-right">
                                <button onClick={() => onDelete(movie.id)} className="text-red-500 hover:text-red-400">Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Admin;