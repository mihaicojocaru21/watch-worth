export const PATHS = {
    public: {
        home:        "/",
        login:       "/login",
        register:    "/register",
        movies:      "/movies",
        movieDetail: "/movies/:id",
        watchlist:   "/watchlist",
        upcoming:    "/upcoming",
        genres:      "/genres",
    },
    private: {
        profile: "/profile",
    },
    admin: {
        root: "/admin",
    },
    errors: {
        unauthorized: "/unauthorized",
        forbidden:    "/forbidden",
        server:       "/error",
    },
};