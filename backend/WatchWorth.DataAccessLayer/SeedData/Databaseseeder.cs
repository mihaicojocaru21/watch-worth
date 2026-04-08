using BCrypt.Net;
using WatchWorth.DataAccessLayer.Context;
using WatchWorth.Domain.Entities;

namespace WatchWorth.DataAccessLayer.SeedData
{
    public static class DatabaseSeeder
    {
        public static void Seed(WatchWorthDbContext ctx)
        {
            ctx.Database.EnsureCreated();

            // ── Users ─────────────────────────────────────────────────────────
            if (!ctx.Users.Any())
            {
                ctx.Users.AddRange(
                    new User { Id = 1, Username = "Admin", Email = "admin@watchworth.com", Role = "admin", Password = BCrypt.Net.BCrypt.HashPassword("admin123") },
                    new User { Id = 2, Username = "User",  Email = "user@watchworth.com",  Role = "user",  Password = BCrypt.Net.BCrypt.HashPassword("user123")  }
                );
                ctx.SaveChanges();
            }

            // ── Movies ────────────────────────────────────────────────────────
            if (!ctx.Movies.Any())
            {
                ctx.Movies.AddRange(
                    new Movie { Id = 1,  TmdbId = 278,    Title = "The Shawshank Redemption",                          Year = 1994, Rating = 9.3, Genre = "Drama",     Image = "", Description = "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency." },
                    new Movie { Id = 2,  TmdbId = 238,    Title = "The Godfather",                                     Year = 1972, Rating = 9.2, Genre = "Crime",     Image = "", Description = "The aging patriarch of an organized crime dynasty transfers control to his reluctant son." },
                    new Movie { Id = 3,  TmdbId = 155,    Title = "The Dark Knight",                                   Year = 2008, Rating = 9.0, Genre = "Action",    Image = "", Description = "When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest tests of his life." },
                    new Movie { Id = 4,  TmdbId = 240,    Title = "The Godfather Part II",                             Year = 1974, Rating = 9.0, Genre = "Crime",     Image = "", Description = "The early life of Vito Corleone is portrayed while his son Michael expands and tightens his grip on the family crime syndicate." },
                    new Movie { Id = 5,  TmdbId = 424,    Title = "Schindler's List",                                  Year = 1993, Rating = 9.0, Genre = "History",   Image = "", Description = "In German-occupied Poland during World War II, Oskar Schindler becomes concerned for his Jewish workforce." },
                    new Movie { Id = 6,  TmdbId = 389,    Title = "12 Angry Men",                                      Year = 1957, Rating = 9.0, Genre = "Drama",     Image = "", Description = "A jury in a New York murder trial is frustrated by a single member whose skeptical caution forces them to reconsider the evidence." },
                    new Movie { Id = 7,  TmdbId = 122,    Title = "The Lord of the Rings: The Return of the King",     Year = 2003, Rating = 9.0, Genre = "Fantasy",   Image = "", Description = "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam." },
                    new Movie { Id = 8,  TmdbId = 680,    Title = "Pulp Fiction",                                      Year = 1994, Rating = 8.9, Genre = "Crime",     Image = "", Description = "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption." },
                    new Movie { Id = 9,  TmdbId = 27205,  Title = "Inception",                                         Year = 2010, Rating = 8.8, Genre = "Sci-Fi",    Image = "", Description = "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into a CEO's mind." },
                    new Movie { Id = 10, TmdbId = 120,    Title = "The Lord of the Rings: The Fellowship of the Ring", Year = 2001, Rating = 8.8, Genre = "Fantasy",   Image = "", Description = "A meek Hobbit and eight companions set out on a journey to destroy the powerful One Ring." },
                    new Movie { Id = 11, TmdbId = 550,    Title = "Fight Club",                                        Year = 1999, Rating = 8.8, Genre = "Drama",     Image = "", Description = "An insomniac office worker and a devil-may-care soap maker form an underground fight club." },
                    new Movie { Id = 12, TmdbId = 13,     Title = "Forrest Gump",                                      Year = 1994, Rating = 8.8, Genre = "Drama",     Image = "", Description = "Historical events unfold through the eyes of a good-natured man from Alabama." },
                    new Movie { Id = 13, TmdbId = 769,    Title = "Goodfellas",                                        Year = 1990, Rating = 8.7, Genre = "Crime",     Image = "", Description = "The story of Henry Hill and his life in the mob." },
                    new Movie { Id = 14, TmdbId = 603,    Title = "The Matrix",                                        Year = 1999, Rating = 8.7, Genre = "Sci-Fi",    Image = "", Description = "A computer hacker discovers the shocking truth about the life he knows." },
                    new Movie { Id = 15, TmdbId = 1891,   Title = "Star Wars: Episode V - The Empire Strikes Back",    Year = 1980, Rating = 8.7, Genre = "Sci-Fi",    Image = "", Description = "After the Rebels are overpowered on Hoth, Luke begins Jedi training while his friends face capture." },
                    new Movie { Id = 16, TmdbId = 157336, Title = "Interstellar",                                      Year = 2014, Rating = 8.6, Genre = "Sci-Fi",    Image = "", Description = "A team of explorers travel through a wormhole in space to ensure humanity's survival." },
                    new Movie { Id = 17, TmdbId = 1366,   Title = "One Flew Over the Cuckoo's Nest",                   Year = 1975, Rating = 8.7, Genre = "Drama",     Image = "", Description = "A criminal pleads insanity and is admitted to a mental institution where he rebels against the nurse." },
                    new Movie { Id = 18, TmdbId = 857,    Title = "Saving Private Ryan",                               Year = 1998, Rating = 8.6, Genre = "War",       Image = "", Description = "Following the Normandy Landings, soldiers go behind enemy lines to retrieve a paratrooper." },
                    new Movie { Id = 19, TmdbId = 274,    Title = "The Silence of the Lambs",                          Year = 1991, Rating = 8.6, Genre = "Thriller",  Image = "", Description = "A young FBI cadet must receive help from an incarcerated cannibal killer to catch another serial killer." },
                    new Movie { Id = 20, TmdbId = 807,    Title = "Se7en",                                             Year = 1995, Rating = 8.6, Genre = "Thriller",  Image = "", Description = "Two detectives hunt a serial killer who uses the seven deadly sins as his motives." },
                    new Movie { Id = 21, TmdbId = 1585,   Title = "It's a Wonderful Life",                             Year = 1946, Rating = 8.6, Genre = "Drama",     Image = "", Description = "An angel shows a frustrated businessman what life would have been like had he never existed." },
                    new Movie { Id = 22, TmdbId = 121,    Title = "The Lord of the Rings: The Two Towers",             Year = 2002, Rating = 8.7, Genre = "Fantasy",   Image = "", Description = "While Frodo and Sam edge closer to Mordor, the divided fellowship makes a stand." },
                    new Movie { Id = 23, TmdbId = 496243, Title = "Parasite",                                          Year = 2019, Rating = 8.5, Genre = "Thriller",  Image = "", Description = "Greed and class discrimination threaten the relationship between the wealthy Park family and the destitute Kim clan." },
                    new Movie { Id = 24, TmdbId = 926,    Title = "The Green Mile",                                    Year = 1999, Rating = 8.6, Genre = "Drama",     Image = "", Description = "The lives of Death Row guards are affected by one of their charges who possesses a mysterious gift." },
                    new Movie { Id = 25, TmdbId = 244786, Title = "Whiplash",                                          Year = 2014, Rating = 8.5, Genre = "Drama",     Image = "", Description = "A promising young drummer enrolls at a cut-throat music conservatory." },
                    new Movie { Id = 26, TmdbId = 98,     Title = "Gladiator",                                         Year = 2000, Rating = 8.5, Genre = "Action",    Image = "", Description = "A former Roman General sets out to exact vengeance against the corrupt emperor." },
                    new Movie { Id = 27, TmdbId = 1124,   Title = "The Prestige",                                      Year = 2006, Rating = 8.5, Genre = "Mystery",   Image = "", Description = "Two stage magicians engage in a battle to create the ultimate illusion." },
                    new Movie { Id = 28, TmdbId = 101,    Title = "Leon: The Professional",                            Year = 1994, Rating = 8.5, Genre = "Action",    Image = "", Description = "12-year-old Mathilda is taken in by Leon after her family is murdered." },
                    new Movie { Id = 29, TmdbId = 73,     Title = "American History X",                                Year = 1998, Rating = 8.5, Genre = "Drama",     Image = "", Description = "A former neo-nazi skinhead tries to prevent his younger brother from following the same path." },
                    new Movie { Id = 30, TmdbId = 1639,   Title = "The Usual Suspects",                                Year = 1995, Rating = 8.5, Genre = "Mystery",   Image = "", Description = "A sole survivor tells of the twisty events leading up to a horrific gun battle on a boat." },
                    new Movie { Id = 31, TmdbId = 77,     Title = "Memento",                                           Year = 2000, Rating = 8.4, Genre = "Mystery",   Image = "", Description = "A man with short-term memory loss attempts to track down his wife's murderer." },
                    new Movie { Id = 32, TmdbId = 1422,   Title = "The Departed",                                      Year = 2006, Rating = 8.5, Genre = "Crime",     Image = "", Description = "An undercover cop and a mole in the police attempt to identify each other." },
                    new Movie { Id = 33, TmdbId = 348,    Title = "Alien",                                             Year = 1979, Rating = 8.4, Genre = "Horror",    Image = "", Description = "After receiving an unknown transmission, one crew member is attacked by a mysterious life form." },
                    new Movie { Id = 34, TmdbId = 28,     Title = "Apocalypse Now",                                    Year = 1979, Rating = 8.4, Genre = "War",       Image = "", Description = "A U.S. Army officer is tasked with assassinating a renegade Special Forces Colonel." },
                    new Movie { Id = 35, TmdbId = 1947,   Title = "Rear Window",                                       Year = 1954, Rating = 8.5, Genre = "Thriller",  Image = "", Description = "A wheelchair-bound photographer spies on his neighbours and suspects one of murder." },
                    new Movie { Id = 36, TmdbId = 289,    Title = "Casablanca",                                        Year = 1942, Rating = 8.5, Genre = "Romance",   Image = "", Description = "A cynical cafe owner struggles to decide whether to help his former lover escape the Nazis." },
                    new Movie { Id = 37, TmdbId = 598,    Title = "City of God",                                       Year = 2002, Rating = 8.6, Genre = "Crime",     Image = "", Description = "In the slums of Rio, two kids' paths diverge as one becomes a photographer and the other a dealer." },
                    new Movie { Id = 38, TmdbId = 475557, Title = "Joker",                                             Year = 2019, Rating = 8.4, Genre = "Drama",     Image = "", Description = "Mentally troubled comedian Arthur Fleck slowly descends into insanity." },
                    new Movie { Id = 39, TmdbId = 16869,  Title = "Inglourious Basterds",                              Year = 2009, Rating = 8.3, Genre = "War",       Image = "", Description = "A plan to assassinate Nazi leaders coincides with a theatre owner's vengeful plans." },
                    new Movie { Id = 40, TmdbId = 68718,  Title = "Django Unchained",                                  Year = 2012, Rating = 8.4, Genre = "Western",   Image = "", Description = "With help from a bounty hunter, a freed slave sets out to rescue his wife." },
                    new Movie { Id = 41, TmdbId = 129,    Title = "Spirited Away",                                     Year = 2001, Rating = 8.6, Genre = "Animation", Image = "", Description = "A 10-year-old girl wanders into a world ruled by gods, witches, and spirits." },
                    new Movie { Id = 42, TmdbId = 8587,   Title = "The Lion King",                                     Year = 1994, Rating = 8.5, Genre = "Animation", Image = "", Description = "Lion prince Simba is targeted by his bitter uncle who wants to ascend the throne." },
                    new Movie { Id = 43, TmdbId = 10681,  Title = "WALL-E",                                            Year = 2008, Rating = 8.4, Genre = "Animation", Image = "", Description = "A small waste-collecting robot embarks on a space journey that will decide the fate of mankind." },
                    new Movie { Id = 44, TmdbId = 37165,  Title = "The Truman Show",                                   Year = 1998, Rating = 8.2, Genre = "Drama",     Image = "", Description = "An insurance salesman discovers his whole life is actually a reality TV show." },
                    new Movie { Id = 45, TmdbId = 489,    Title = "Good Will Hunting",                                 Year = 1997, Rating = 8.3, Genre = "Drama",     Image = "", Description = "Will Hunting, a janitor at M.I.T., has a gift for mathematics but needs direction." },
                    new Movie { Id = 46, TmdbId = 694,    Title = "The Shining",                                       Year = 1980, Rating = 8.4, Genre = "Horror",    Image = "", Description = "A family heads to an isolated hotel where a sinister presence influences the father." },
                    new Movie { Id = 47, TmdbId = 335984, Title = "Blade Runner 2049",                                 Year = 2017, Rating = 8.0, Genre = "Sci-Fi",    Image = "", Description = "Young Blade Runner K's discovery of a secret leads him to track down former Blade Runner Deckard." },
                    new Movie { Id = 48, TmdbId = 6977,   Title = "No Country for Old Men",                            Year = 2007, Rating = 8.2, Genre = "Thriller",  Image = "", Description = "Violence and mayhem ensue after a hunter stumbles upon a drug deal gone wrong." },
                    new Movie { Id = 49, TmdbId = 453,    Title = "A Beautiful Mind",                                  Year = 2001, Rating = 8.2, Genre = "Biography", Image = "", Description = "After John Nash accepts secret work in cryptography, his life takes a turn for the nightmarish." },
                    new Movie { Id = 50, TmdbId = 120467, Title = "The Grand Budapest Hotel",                          Year = 2014, Rating = 8.1, Genre = "Comedy",    Image = "", Description = "A writer encounters the owner of an aging European hotel and learns of his early years." }
                );
                ctx.SaveChanges();
            }
        }
    }
}