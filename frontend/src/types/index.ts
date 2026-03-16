export interface Movie {
    id: number;
    title: string;
    year: number;
    description: string;
    rating: number;
    image: string;
    genre: string;
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