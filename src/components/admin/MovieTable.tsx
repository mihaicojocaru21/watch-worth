import type { Movie } from '../../types';

type MovieTableProps = {
    movies: Movie[];
    onDelete: (id: number) => Promise<void>;
    onEdit: (movie: Movie) => void;
};

const MovieTable = ({ movies, onDelete }: MovieTableProps) => {
    return (
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
                {movies.map((movie) => (
                    <tr key={movie.id} className="border-b border-gray-700">
                        <td className="p-4">{movie.title}</td>
                        <td className="p-4">{movie.year}</td>
                        <td className="p-4">{movie.genre}</td>
                        <td className="p-4 text-right space-x-4">
                            <button onClick={() => onEdit(movie)} className="text-blue-400 hover:text-blue-300">
                                Edit
                            </button>
                            <button onClick={() => onDelete(movie.id)} className="text-red-500 hover:text-red-400">
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default MovieTable;