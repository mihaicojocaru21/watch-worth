export interface Movie {
    id: number;
    title: string;
    year: number;
    description: string;
    rating: number;
    image: string;
    genre: string;
}

export interface User {
    id: number;
    username: string;
    email: string;
    role: 'admin' | 'user';
}