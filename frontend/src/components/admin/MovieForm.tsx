import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const movieSchema = z.object({
    title: z.string().min(2, 'Title too short'),
    year: z.number().min(1900).max(new Date().getFullYear() + 1),
    genre: z.string().min(2, 'Genre required'),
    rating: z.number().min(0).max(10).optional(),
    image: z.string().url('Must be a valid URL').optional().or(z.literal('')),
    description: z.string().min(10, 'Description too short').optional(),
});

export type MovieFormData = z.infer<typeof movieSchema>;

type MovieFormProps = {
    onSubmit: (data: MovieFormData) => Promise<void>;
    initialValues?: MovieFormData;
    submitLabel?: string;
    onCancel?: () => void;
};

const defaultValues: MovieFormData = {
    title: '',
    year: new Date().getFullYear(),
    genre: '',
    rating: 7.0,
    image: '',
    description: '',
};

const MovieForm = ({ onSubmit, initialValues, submitLabel = 'Add', onCancel }: MovieFormProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<MovieFormData>({
        resolver: zodResolver(movieSchema),
        defaultValues: initialValues ?? defaultValues,
    });

    useEffect(() => {
        reset(initialValues ?? defaultValues);
    }, [initialValues, reset]);

    const handleFormSubmit = async (data: MovieFormData) => {
        await onSubmit(data);
        reset(defaultValues);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="bg-gray-800 p-6 rounded-lg border border-gray-700 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <input {...register('title')} placeholder="Title" className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 outline-none" />
                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                </div>

                <div className="w-28">
                    <input {...register('year', { valueAsNumber: true })} type="number" placeholder="Year" className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 outline-none" />
                    {errors.year && <p className="text-red-500 text-xs mt-1">Invalid year</p>}
                </div>

                <div className="w-36">
                    <input {...register('genre')} placeholder="Genre" className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 outline-none" />
                    {errors.genre && <p className="text-red-500 text-xs mt-1">{errors.genre.message}</p>}
                </div>

                <div className="w-24">
                    <input {...register('rating', { valueAsNumber: true })} type="number" step="0.1" min="0" max="10" placeholder="Rating" className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 outline-none" />
                    {errors.rating && <p className="text-red-500 text-xs mt-1">0 – 10</p>}
                </div>
            </div>

            <div>
                <input {...register('image')} placeholder="Image URL (optional)" className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 outline-none" />
                {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
            </div>

            <div>
                <textarea {...register('description')} placeholder="Description (optional)" rows={3} className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 outline-none resize-none" />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
            </div>

            <div className="flex gap-4">
                <button type="submit" className="bg-green-600 px-6 py-2 text-white rounded font-bold hover:bg-green-700 transition-colors">
                    {submitLabel}
                </button>
                {onCancel && (
                    <button type="button" onClick={onCancel} className="bg-gray-600 px-6 py-2 text-white rounded font-bold hover:bg-gray-500 transition-colors">
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default MovieForm;