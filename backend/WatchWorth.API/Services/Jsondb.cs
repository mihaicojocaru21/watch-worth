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
        new() { Id = 8,  TmdbId = 680,    Title = "Pulp Fiction",                                      Year = 1994, Rating = 8.9, Genre = "Crime",     Image = "", Description = "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption." },
        new() { Id = 9,  TmdbId = 27205,  Title = "Inception",                                         Year = 2010, Rating = 8.8, Genre = "Sci-Fi",    Image = "", Description = "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O." },
        new() { Id = 10, TmdbId = 120,    Title = "The Lord of the Rings: The Fellowship of the Ring", Year = 2001, Rating = 8.8, Genre = "Fantasy",   Image = "", Description = "A meek Hobbit and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron." },
        new() { Id = 11, TmdbId = 550,    Title = "Fight Club",                                        Year = 1999, Rating = 8.8, Genre = "Drama",     Image = "", Description = "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into something much more." },
        new() { Id = 12, TmdbId = 13,     Title = "Forrest Gump",                                      Year = 1994, Rating = 8.8, Genre = "Drama",     Image = "", Description = "Historical events from Kennedy to Watergate unfold through the eyes of a good-natured man from Alabama with an extraordinary life." },
        new() { Id = 13, TmdbId = 769,    Title = "Goodfellas",                                        Year = 1990, Rating = 8.7, Genre = "Crime",     Image = "", Description = "The story of Henry Hill and his life in the mob, covering his relationships with his partners Jimmy Conway and Tommy DeVito." },
        new() { Id = 14, TmdbId = 603,    Title = "The Matrix",                                        Year = 1999, Rating = 8.7, Genre = "Sci-Fi",    Image = "", Description = "A computer hacker discovers the shocking truth — the life he knows is the elaborate deception of an evil cyber-intelligence." },
        new() { Id = 15, TmdbId = 1891,   Title = "Star Wars: Episode V - The Empire Strikes Back",    Year = 1980, Rating = 8.7, Genre = "Sci-Fi",    Image = "", Description = "After the Rebels are brutally overpowered on Hoth, Luke Skywalker begins Jedi training with Yoda while his friends face capture." },
        new() { Id = 16, TmdbId = 157336, Title = "Interstellar",                                      Year = 2014, Rating = 8.6, Genre = "Sci-Fi",    Image = "", Description = "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival." },
        new() { Id = 17, TmdbId = 1366,   Title = "One Flew Over the Cuckoo's Nest",                   Year = 1975, Rating = 8.7, Genre = "Drama",     Image = "", Description = "A criminal pleads insanity and is admitted to a mental institution, where he rebels against the oppressive nurse and rallies the patients." },
        new() { Id = 18, TmdbId = 857,    Title = "Saving Private Ryan",                               Year = 1998, Rating = 8.6, Genre = "War",       Image = "", Description = "Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed." },
        new() { Id = 19, TmdbId = 274,    Title = "The Silence of the Lambs",                          Year = 1991, Rating = 8.6, Genre = "Thriller",  Image = "", Description = "A young F.B.I. cadet must receive the help of an incarcerated cannibal killer to help catch another serial killer." },
        new() { Id = 20, TmdbId = 807,    Title = "Se7en",                                             Year = 1995, Rating = 8.6, Genre = "Thriller",  Image = "", Description = "Two detectives hunt a serial killer who uses the seven deadly sins as his motives." },
        new() { Id = 21, TmdbId = 1585,   Title = "It's a Wonderful Life",                             Year = 1946, Rating = 8.6, Genre = "Drama",     Image = "", Description = "An angel is sent to help a frustrated businessman by showing him what life would have been like if he had never existed." },
        new() { Id = 22, TmdbId = 121,    Title = "The Lord of the Rings: The Two Towers",             Year = 2002, Rating = 8.7, Genre = "Fantasy",   Image = "", Description = "While Frodo and Sam edge closer to Mordor with Gollum, the divided fellowship makes a stand against Sauron's new ally." },
        new() { Id = 23, TmdbId = 496243, Title = "Parasite",                                          Year = 2019, Rating = 8.5, Genre = "Thriller",  Image = "", Description = "Greed and class discrimination threaten the symbiotic relationship between the wealthy Park family and the destitute Kim clan." },
        new() { Id = 24, TmdbId = 926,    Title = "The Green Mile",                                    Year = 1999, Rating = 8.6, Genre = "Drama",     Image = "", Description = "The lives of Death Row guards are affected by one of their charges — a man accused of murder who possesses a mysterious gift." },
        new() { Id = 25, TmdbId = 244786, Title = "Whiplash",                                          Year = 2014, Rating = 8.5, Genre = "Drama",     Image = "", Description = "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are pushed to the limit." },
        new() { Id = 26, TmdbId = 98,     Title = "Gladiator",                                         Year = 2000, Rating = 8.5, Genre = "Action",    Image = "", Description = "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery." },
        new() { Id = 27, TmdbId = 1124,   Title = "The Prestige",                                      Year = 2006, Rating = 8.5, Genre = "Mystery",   Image = "", Description = "After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything to outwit each other." },
        new() { Id = 28, TmdbId = 101,    Title = "Leon: The Professional",                            Year = 1994, Rating = 8.5, Genre = "Action",    Image = "", Description = "12-year-old Mathilda is taken in by Leon, a professional cleaner, after her family is murdered. She becomes his apprentice." },
        new() { Id = 29, TmdbId = 73,     Title = "American History X",                                Year = 1998, Rating = 8.5, Genre = "Drama",     Image = "", Description = "A former neo-nazi skinhead tries to prevent his younger brother from going down the same wrong path that he did." },
        new() { Id = 30, TmdbId = 1639,   Title = "The Usual Suspects",                                Year = 1995, Rating = 8.5, Genre = "Mystery",   Image = "", Description = "A sole survivor tells of the twisty events leading up to a horrific gun battle on a boat, which began with five criminals at a police lineup." },
        new() { Id = 31, TmdbId = 77,     Title = "Memento",                                           Year = 2000, Rating = 8.4, Genre = "Mystery",   Image = "", Description = "A man with short-term memory loss attempts to track down his wife's murderer." },
        new() { Id = 32, TmdbId = 1422,   Title = "The Departed",                                      Year = 2006, Rating = 8.5, Genre = "Crime",     Image = "", Description = "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston." },
        new() { Id = 33, TmdbId = 348,    Title = "Alien",                                             Year = 1979, Rating = 8.4, Genre = "Horror",    Image = "", Description = "After a space merchant vessel receives an unknown transmission, one of the crew is attacked by a mysterious life form." },
        new() { Id = 34, TmdbId = 28,     Title = "Apocalypse Now",                                    Year = 1979, Rating = 8.4, Genre = "War",       Image = "", Description = "A U.S. Army officer serving in Vietnam is tasked with assassinating a renegade Special Forces Colonel who sees himself as a god." },
        new() { Id = 35, TmdbId = 1947,   Title = "Rear Window",                                       Year = 1954, Rating = 8.5, Genre = "Thriller",  Image = "", Description = "A wheelchair-bound photographer spies on his neighbours from his apartment window and becomes convinced one of them has committed murder." },
        new() { Id = 36, TmdbId = 289,    Title = "Casablanca",                                        Year = 1942, Rating = 8.5, Genre = "Romance",   Image = "", Description = "A cynical cafe owner struggles to decide whether to help his former lover and her fugitive husband escape the Nazis in French Morocco." },
        new() { Id = 37, TmdbId = 598,    Title = "City of God",                                       Year = 2002, Rating = 8.6, Genre = "Crime",     Image = "", Description = "In the slums of Rio, two kids' paths diverge as one becomes a photographer and the other a drug dealer." },
        new() { Id = 38, TmdbId = 475557, Title = "Joker",                                             Year = 2019, Rating = 8.4, Genre = "Drama",     Image = "", Description = "Mentally troubled comedian Arthur Fleck is disregarded by society, causing him to slowly descend into insanity and become a criminal mastermind." },
        new() { Id = 39, TmdbId = 16869,  Title = "Inglourious Basterds",                              Year = 2009, Rating = 8.3, Genre = "War",       Image = "", Description = "In Nazi-occupied France, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owner's vengeful plans." },
        new() { Id = 40, TmdbId = 68718,  Title = "Django Unchained",                                  Year = 2012, Rating = 8.4, Genre = "Western",   Image = "", Description = "With the help of a German bounty hunter, a freed slave sets out to rescue his wife from a brutal Mississippi plantation owner." },
        new() { Id = 41, TmdbId = 129,    Title = "Spirited Away",                                     Year = 2001, Rating = 8.6, Genre = "Animation", Image = "", Description = "During her family's move to the suburbs, a 10-year-old girl wanders into a world ruled by gods, witches, and spirits." },
        new() { Id = 42, TmdbId = 8587,   Title = "The Lion King",                                     Year = 1994, Rating = 8.5, Genre = "Animation", Image = "", Description = "Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself." },
        new() { Id = 43, TmdbId = 10681,  Title = "WALL-E",                                            Year = 2008, Rating = 8.4, Genre = "Animation", Image = "", Description = "In the distant future, a small waste-collecting robot inadvertently embarks on a space journey that will decide the fate of mankind." },
        new() { Id = 44, TmdbId = 37165,  Title = "The Truman Show",                                   Year = 1998, Rating = 8.2, Genre = "Drama",     Image = "", Description = "An insurance salesman discovers his whole life is actually a reality TV show." },
        new() { Id = 45, TmdbId = 489,    Title = "Good Will Hunting",                                 Year = 1997, Rating = 8.3, Genre = "Drama",     Image = "", Description = "Will Hunting, a janitor at M.I.T., has a gift for mathematics but needs help from a psychologist to find direction in his life." },
        new() { Id = 46, TmdbId = 694,    Title = "The Shining",                                       Year = 1980, Rating = 8.4, Genre = "Horror",    Image = "", Description = "A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence." },
        new() { Id = 47, TmdbId = 335984, Title = "Blade Runner 2049",                                 Year = 2017, Rating = 8.0, Genre = "Sci-Fi",    Image = "", Description = "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard." },
        new() { Id = 48, TmdbId = 6977,   Title = "No Country for Old Men",                            Year = 2007, Rating = 8.2, Genre = "Thriller",  Image = "", Description = "Violence and mayhem ensue after a hunter stumbles upon a drug deal gone wrong and more than two million dollars in cash." },
        new() { Id = 49, TmdbId = 453,    Title = "A Beautiful Mind",                                  Year = 2001, Rating = 8.2, Genre = "Biography", Image = "", Description = "After John Nash, a brilliant mathematician, accepts secret work in cryptography, his life takes a turn for the nightmarish." },
        new() { Id = 50, TmdbId = 120467, Title = "The Grand Budapest Hotel",                          Year = 2014, Rating = 8.1, Genre = "Comedy",    Image = "", Description = "A writer encounters the owner of an aging European hotel between the wars and learns of his early years serving as a lobby boy." },
    ];
}