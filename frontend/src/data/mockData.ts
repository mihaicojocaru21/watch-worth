import type { Movie, User } from '../types';

export const MOCK_MOVIES: Movie[] = [
    {
        id: 1,
        title: "Inception",
        year: 2010,
        description: "A thief who steals corporate secrets through the use of dream-sharing technology.",
        rating: 8.8,
        image: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
        genre: "Sci-Fi"
    },
    {
        id: 2,
        title: "The Dark Knight",
        year: 2008,
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham.",
        rating: 9.0,
        image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        genre: "Action"
    },
    {
        id: 3,
        title: "Interstellar",
        year: 2014,
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        rating: 8.6,
        image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        genre: "Sci-Fi"
    }
];

export const MOCK_USERS: User[] = [
    { id: 1, username: "mihai admin", email: "admin@watchworth.com", role: "admin" },
    { id: 2, username: "mihai user", email: "user@watchworth.com", role: "user" }
];