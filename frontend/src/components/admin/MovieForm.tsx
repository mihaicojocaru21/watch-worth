import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const movieSchema = z.object({
    title:       z.string().min(1, 'Title is required'),
    year:        z.number({ invalid_type_error: 'Enter a valid year' }).min(1888).max(2099),
    genre:       z.string().min(1, 'Genre is required'),
    rating:      z.number({ invalid_type_error: 'Enter a rating' }).min(0).max(10),
    tmdbId:      z.number({ invalid_type_error: 'Enter a number' }).int().min(0).optional(),
    image:       z.string().url('Enter a valid URL').or(z.literal('')).optional(),
    description: z.string().optional(),
});

export type MovieFormData = z.infer<typeof movieSchema>;

interface Props {
    onSubmit:       (data: MovieFormData) => Promise<void>;
    initialValues?: Partial<MovieFormData>;
    submitLabel?:   string;
    onCancel?:      () => void;
}

const Field = ({ label, hint, error, children }: {
    label: string; hint?: string; error?: string; children: React.ReactNode;
}) => (
    <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">{label}</label>
            {hint && <span className="text-[10px] text-gray-600">{hint}</span>}
        </div>
        {children}
        {error && <p className="text-xs text-red-400 flex items-center gap-1"><span>⚠</span>{error}</p>}
    </div>
);

const inputCls = (hasError?: boolean) =>
    `w-full px-3.5 py-2.5 rounded-xl bg-gray-900/70 border text-white text-sm placeholder-gray-600 focus:outline-none transition-all ${
        hasError
            ? 'border-red-500/60 focus:border-red-400 focus:ring-2 focus:ring-red-500/10'
            : 'border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10'
    }`;

const MovieForm = ({ onSubmit, initialValues, submitLabel = 'Add Movie', onCancel }: Props) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<MovieFormData>({
        resolver: zodResolver(movieSchema),
        defaultValues: {
            title:       initialValues?.title       ?? '',
            year:        initialValues?.year        ?? new Date().getFullYear(),
            genre:       initialValues?.genre       ?? '',
            rating:      initialValues?.rating      ?? 7.0,
            tmdbId:      initialValues?.tmdbId      ?? undefined,
            image:       initialValues?.image       ?? '',
            description: initialValues?.description ?? '',
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <Field label="Title" error={errors.title?.message}>
                <input
                    {...register('title')}
                    placeholder="e.g. The Godfather"
                    className={inputCls(!!errors.title)}
                />
            </Field>

            <div className="grid grid-cols-2 gap-3">
                <Field label="Year" error={errors.year?.message}>
                    <input
                        {...register('year', { valueAsNumber: true })}
                        type="number"
                        placeholder="2024"
                        className={inputCls(!!errors.year)}
                    />
                </Field>
                <Field label="Rating" error={errors.rating?.message}>
                    <input
                        {...register('rating', { valueAsNumber: true })}
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        placeholder="8.5"
                        className={inputCls(!!errors.rating)}
                    />
                </Field>
            </div>

            <Field label="Genre" error={errors.genre?.message}>
                <input
                    {...register('genre')}
                    placeholder="e.g. Drama, Sci-Fi"
                    className={inputCls(!!errors.genre)}
                />
            </Field>

            <Field
                label="TMDB ID"
                hint="optional — enables auto poster"
                error={errors.tmdbId?.message}
            >
                <input
                    {...register('tmdbId', { setValueAs: v => v === '' ? undefined : Number(v) })}
                    type="number"
                    min="0"
                    placeholder="e.g. 278"
                    className={inputCls(!!errors.tmdbId)}
                />
            </Field>

            <Field label="Poster URL" hint="fallback if no TMDB ID" error={errors.image?.message}>
                <input
                    {...register('image')}
                    placeholder="https://image.tmdb.org/..."
                    className={inputCls(!!errors.image)}
                />
            </Field>

            <div className="sm:col-span-2">
                <Field label="Description" error={errors.description?.message}>
                    <textarea
                        {...register('description')}
                        rows={3}
                        placeholder="Short synopsis…"
                        className={`${inputCls(!!errors.description)} resize-none`}
                    />
                </Field>
            </div>

            {/* TMDB hint */}
            <div className="sm:col-span-2 -mt-1">
                <p className="text-[11px] text-gray-600">
                    Find the TMDB ID at{' '}
                    <a
                        href="https://www.themoviedb.org"
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500/70 hover:text-blue-400 transition-colors"
                    >
                        themoviedb.org
                    </a>
                    {' '}— it appears in the movie page URL (e.g. /movie/<strong>278</strong>-the-shawshank-redemption).
                </p>
            </div>

            <div className="sm:col-span-2 flex items-center gap-3 pt-2">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-semibold transition-all shadow-lg shadow-blue-600/20"
                >
                    {isSubmitting ? (
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                    ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    )}
                    {isSubmitting ? 'Saving…' : submitLabel}
                </button>

                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-gray-700 transition-all"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default MovieForm;