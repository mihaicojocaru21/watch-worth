import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const movieSchema = z.object({
    title: z.string().min(2, 'Title too short'),
    year: z.number().min(1900).max(2030),
    genre: z.string().min(3, 'Genre required'),
});

export type MovieFormData = z.infer<typeof movieSchema>;

type MovieFormProps = {
    onSubmit: (data: MovieFormData) => Promise<void>;
    initialValues?: MovieFormData;
    submitLabel?: string;
    onCancel?: () => void;
};

const MovieForm = ({ onSubmit, initialValues, submitLabel = 'Add', onCancel }: MovieFormProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<MovieFormData>({
        resolver: zodResolver(movieSchema),
        defaultValues: initialValues ?? { title: '', year: 2000, genre: '' },
    });

    useEffect(() => {
        reset(initialValues ?? { title: '', year: 2000, genre: '' });
    }, [initialValues, reset]);

    const handleFormSubmit = async (data: MovieFormData) => {
        await onSubmit(data);
        reset(initialValues ?? { title: '', year: 2000, genre: '' });
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="bg-gray-800 p-6 rounded-lg border border-gray-700 flex flex-col md:flex-row gap-4">
            <div className="flex-1">
                <input {...register('title')} placeholder="Title" className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600" />
                {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
            </div>

            <div className="w-32">
                <input {...register('year', { valueAsNumber: true })} type="number" placeholder="Year" className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600" />
                {errors.year && <p className="text-red-500 text-xs">Invalid year</p>}
            </div>

            <div className="w-48">
                <input {...register('genre')} placeholder="Genre" className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600" />
                {errors.genre && <p className="text-red-500 text-xs">{errors.genre.message}</p>}
            </div>

            <button type="submit" className="bg-green-600 px-6 py-2 text-white rounded font-bold hover:bg-green-700">
                {submitLabel}
            </button>

            {onCancel && (
                <button type="button" onClick={onCancel} className="bg-gray-600 px-6 py-2 text-white rounded font-bold hover:bg-gray-500">
                    Cancel
                </button>
            )}
        </form>
    );
};

export default MovieForm;