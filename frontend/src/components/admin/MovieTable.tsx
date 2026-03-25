import { useState } from 'react';
import type { Movie } from '../../types';

const PAGE_SIZE = 10;

type MovieTableProps = {
    movies:   Movie[];
    onDelete: (movie: Movie) => void;
    onEdit:   (movie: Movie) => void;
};

const MovieTable = ({ movies, onDelete, onEdit }: MovieTableProps) => {
    const [page, setPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(movies.length / PAGE_SIZE));
    const safePage   = Math.min(page, totalPages);
    const start      = (safePage - 1) * PAGE_SIZE;
    const pageMovies = movies.slice(start, start + PAGE_SIZE);

    if (page > totalPages && totalPages > 0) setPage(1);

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-gray-300">
                    <thead>
                    <tr className="border-b border-gray-700/60">
                        <th className="px-5 py-3.5 text-[11px] font-bold uppercase tracking-widest text-gray-500">#</th>
                        <th className="px-5 py-3.5 text-[11px] font-bold uppercase tracking-widest text-gray-500">Title</th>
                        <th className="px-5 py-3.5 text-[11px] font-bold uppercase tracking-widest text-gray-500 hidden sm:table-cell">Year</th>
                        <th className="px-5 py-3.5 text-[11px] font-bold uppercase tracking-widest text-gray-500 hidden md:table-cell">Genre</th>
                        <th className="px-5 py-3.5 text-[11px] font-bold uppercase tracking-widest text-gray-500 hidden md:table-cell">Rating</th>
                        <th className="px-5 py-3.5 text-[11px] font-bold uppercase tracking-widest text-gray-500 text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700/40">
                    {pageMovies.map((movie, idx) => (
                        <tr key={movie.id} className="group hover:bg-gray-700/20 transition-colors">
                            <td className="px-5 py-3.5 text-xs text-gray-600 font-mono">{start + idx + 1}</td>
                            <td className="px-5 py-3.5">
                                <span className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">{movie.title}</span>
                            </td>
                            <td className="px-5 py-3.5 text-sm text-gray-400 hidden sm:table-cell">{movie.year}</td>
                            <td className="px-5 py-3.5 hidden md:table-cell">
                                <span className="px-2.5 py-1 rounded-lg bg-gray-700/60 text-xs font-semibold text-gray-300 border border-gray-600/50">{movie.genre}</span>
                            </td>
                            <td className="px-5 py-3.5 hidden md:table-cell">
                                <div className="flex items-center gap-1">
                                    <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                    <span className="text-sm font-bold text-yellow-400">{movie.rating.toFixed(1)}</span>
                                </div>
                            </td>
                            <td className="px-5 py-3.5 text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <button
                                        onClick={() => onEdit(movie)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-400 hover:text-white hover:bg-blue-600 border border-blue-500/20 hover:border-blue-500 transition-all"
                                    >
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete(movie)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-400 hover:text-white hover:bg-red-600 border border-red-500/20 hover:border-red-500 transition-all"
                                    >
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* ── Pagination ── */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between px-5 py-4 border-t border-gray-700/50">
                    <p className="text-xs text-gray-500">
                        Showing <span className="text-gray-300 font-semibold">{start + 1}–{Math.min(start + PAGE_SIZE, movies.length)}</span> of{' '}
                        <span className="text-gray-300 font-semibold">{movies.length}</span>
                    </p>

                    <div className="flex items-center gap-1">
                        <button onClick={() => setPage(1)} disabled={safePage === 1}
                                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-white hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7"/></svg>
                        </button>
                        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={safePage === 1}
                                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-white hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                            .filter(p => p === 1 || p === totalPages || Math.abs(p - safePage) <= 1)
                            .reduce<(number | '…')[]>((acc, p, i, arr) => {
                                if (i > 0 && (p as number) - (arr[i - 1] as number) > 1) acc.push('…');
                                acc.push(p);
                                return acc;
                            }, [])
                            .map((p, i) =>
                                p === '…'
                                    ? <span key={`e${i}`} className="w-8 h-8 flex items-center justify-center text-gray-600 text-xs">…</span>
                                    : <button key={p} onClick={() => setPage(p as number)}
                                              className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-all ${safePage === p ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}>
                                        {p}
                                    </button>
                            )
                        }

                        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={safePage === totalPages}
                                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-white hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                        </button>
                        <button onClick={() => setPage(totalPages)} disabled={safePage === totalPages}
                                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-white hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7"/></svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovieTable;