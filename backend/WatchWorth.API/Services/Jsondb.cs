using System.Text.Json;
using WatchWorth.API.Models;

namespace WatchWorth.API.Services;

public class JsonDb
{
    private readonly string _dataDir;

    private static readonly JsonSerializerOptions _opts = new()
    {
        PropertyNamingPolicy        = JsonNamingPolicy.CamelCase,
        WriteIndented               = true,
        PropertyNameCaseInsensitive = true,
    };

    public JsonDb(IWebHostEnvironment env)
    {
        _dataDir = Path.Combine(env.ContentRootPath, "data");
        Directory.CreateDirectory(_dataDir);
        SeedIfEmpty();
    }

    // ── Generic helpers ───────────────────────────────────────────────────────

    private T Read<T>(string file, T fallback)
    {
        var path = Path.Combine(_dataDir, file);
        if (!File.Exists(path)) return fallback;
        try   { return JsonSerializer.Deserialize<T>(File.ReadAllText(path), _opts) ?? fallback; }
        catch { return fallback; }
    }

    private void Write<T>(string file, T data) =>
        File.WriteAllText(Path.Combine(_dataDir, file), JsonSerializer.Serialize(data, _opts));

    // ── Public accessors ──────────────────────────────────────────────────────

    public List<Movie>     GetMovies()     => Read("movies.json",     new List<Movie>());
    public void            SaveMovies(List<Movie> m)     => Write("movies.json", m);

    public List<User>      GetUsers()      => Read("users.json",      new List<User>());
    public void            SaveUsers(List<User> u)       => Write("users.json", u);

    public List<Review>    GetReviews()    => Read("reviews.json",    new List<Review>());
    public void            SaveReviews(List<Review> r)   => Write("reviews.json", r);

    public List<Watchlist> GetWatchlists() => Read("watchlists.json", new List<Watchlist>());
    public void            SaveWatchlists(List<Watchlist> w) => Write("watchlists.json", w);

    // ── Seed on first boot ────────────────────────────────────────────────────

    private void SeedIfEmpty()
    {
        if (!File.Exists(Path.Combine(_dataDir, "movies.json")))
            Write("movies.json", SeedMovies());

        if (!File.Exists(Path.Combine(_dataDir, "users.json")))
            Write("users.json", new List<User>
            {
                new() { Id = 1, Username = "Admin", Email = "admin@watchworth.com", Role = "admin", Password = "admin123" },
                new() { Id = 2, Username = "User",  Email = "user@watchworth.com",  Role = "user",  Password = "user123"  },
            });

        if (!File.Exists(Path.Combine(_dataDir, "reviews.json")))
            Write("reviews.json", new List<Review>());

        if (!File.Exists(Path.Combine(_dataDir, "watchlists.json")))
            Write("watchlists.json", new List<Watchlist>());
    }

    private static List<Movie> SeedMovies() =>
    [
        new() { Id = 1,  TmdbId = 278,    Title = "The Shawshank Redemption",                          Year = 1994, Rating = 9.3, Genre = "Drama",     Image = "", Description = "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency." },
        new() { Id = 2,  TmdbId = 238,    Title = "The Godfather",                                     Year = 1972, Rating = 9.2, Genre = "Crime",     Image = "", Description = "The aging patriarch of an organized crime dynasty transfers control to his reluctant son." },
        new() { Id = 3,  TmdbId = 155,    Title = "The Dark Knight",                                   Year = 2008, Rating = 9.0, Genre = "Action",    Image = "", Description = "When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest tests of his life." },
        new() { Id = 4,  TmdbId = 240,    Title = "The Godfather Part II",                             Year = 1974, Rating = 9.0, Genre = "Crime",     Image = "", Description = "The early life of Vito Corleone is portrayed while his son Michael expands and tightens his grip on the family crime syndicate." },
        new() { Id = 5,  TmdbId = 424,    Title = "Schindler's List",                                  Year = 1993, Rating = 9.0, Genre = "History",   Image = "", Description = "In German-occupied Poland during World War II, Oskar Schindler becomes concerned for his Jewish workforce after witnessing their persecution." },
        new() { Id = 6,  TmdbId = 389,    Title = "12 Angry Men",                                      Year = 1957, Rating = 9.0, Genre = "Drama",     Image = "", Description = "A jury in a New York murder trial is frustrated by a single member whose skeptical caution forces them to reconsider the evidence." },
        new() { Id = 7,  TmdbId = 122,    Title = "The Lord of the Rings: The Return of the King",     Year = 2003, Rating = 9.0, Genre = "Fantasy",   Image = "", Description = "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom." },
        new() { Id = 8,  TmdbId = 680,    Title = "Pulp Fiction",                                      Year = 1994, Rating = 8.9, Genre = "Crime",     Image = "", Description = "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption." },
        new() { Id = 9,  TmdbId = 27205,  Title = "Inception",                                         Year = 2010, Rating = 8.8, Genre = "Sci-Fi",    Image = "", Description = "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O." },
        new() { Id = 10, TmdbId = 120,    Title = "The Lord of the Rings: The Fellowship of the Ring", Year = 2001, Rating = 8.8, Genre = "Fantasy",   Image = "", Description = "A meek Hobbit and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron." },
        new() { Id = 11, TmdbId = 550,    Title = "Fight Club",                                        Year = 1999, Rating = 8.8, Genre = "Drama",     Image = "", Description = "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into something much more." },
        new() { Id = 12, TmdbId = 13,     Title = "Forrest Gump",                                      Year = 1994, Rating = 8.8, Genre = "Drama",     Image = "", Description = "Historical events from Kennedy to Watergate unfold through the eyes of a good-natured man from Alabama." },
        new() { Id = 13, TmdbId = 769,    Title = "Goodfellas",                                        Year = 1990, Rating = 8.7, Genre = "Crime",     Image = "", Description = "The story of Henry Hill and his life in the mob." },
        new() { Id = 14, TmdbId = 603,    Title = "The Matrix",                                        Year = 1999, Rating = 8.7, Genre = "Sci-Fi",    Image = "", Description = "A computer hacker discovers the shocking truth — the life he knows is the elaborate deception of an evil cyber-intelligence." },
        new() { Id = 15, TmdbId = 157336, Title = "Interstellar",                                      Year = 2014, Rating = 8.6, Genre = "Sci-Fi",    Image = "", Description = "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival." },
        new() { Id = 16, TmdbId = 244786, Title = "Whiplash",                                          Year = 2014, Rating = 8.5, Genre = "Drama",     Image = "", Description = "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are pushed to the limit." },
        new() { Id = 17, TmdbId = 496243, Title = "Parasite",                                          Year = 2019, Rating = 8.5, Genre = "Thriller",  Image = "", Description = "Greed and class discrimination threaten the symbiotic relationship between the wealthy Park family and the destitute Kim clan." },
        new() { Id = 18, TmdbId = 129,    Title = "Spirited Away",                                     Year = 2001, Rating = 8.6, Genre = "Animation", Image = "", Description = "During her family's move to the suburbs, a 10-year-old girl wanders into a world ruled by gods, witches, and spirits." },
        new() { Id = 19, TmdbId = 98,     Title = "Gladiator",                                         Year = 2000, Rating = 8.5, Genre = "Action",    Image = "", Description = "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family." },
        new() { Id = 20, TmdbId = 274,    Title = "The Silence of the Lambs",                          Year = 1991, Rating = 8.6, Genre = "Thriller",  Image = "", Description = "A young F.B.I. cadet must receive the help of an incarcerated cannibal killer to help catch another serial killer." },
    ];
}