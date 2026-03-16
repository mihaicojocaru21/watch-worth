export interface Movie {
    id: number;
    title: string;
    year: number;
    description: string;
    rating: number;
    image: string;
    genre: string;
}

export interface UpcomingMovie {
    id: number;
    title: string;
    year: number;
    releaseDate: string;
    genre: string;
    director: string;
    cast: string[];
    description: string;
    image: string;
    status: 'Coming Soon' | 'In Production' | 'Post-Production';
}

export interface Review {
    id: string;
    movieId: number;
    userId: number;
    username: string;
    rating: number;
    text: string;
    createdAt: string;
}

export interface User {
    id: number;
    username: string;
    email: string;
    role: 'admin' | 'user';
    password: string;
}