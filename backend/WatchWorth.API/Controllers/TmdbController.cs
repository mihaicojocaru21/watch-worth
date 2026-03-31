using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text.Json.Serialization;
using WatchWorth.DataAccessLayer.Context;
using WatchWorth.Domain.Entities;

namespace WatchWorth.API.Controllers
{
    [Route("api/tmdb")]
    [ApiController]
    public class TmdbController : ControllerBase
    {
        private readonly IHttpClientFactory _http;
        private readonly IConfiguration _config;

        private static readonly Dictionary<int, string> GenreMap = new()
        {
            { 28,    "Action"      }, { 12,    "Adventure"  },
            { 16,    "Animation"   }, { 35,    "Comedy"     },
            { 80,    "Crime"       }, { 18,    "Drama"      },
            { 14,    "Fantasy"     }, { 36,    "History"    },
            { 27,    "Horror"      }, { 9648,  "Mystery"    },
            { 10749, "Romance"     }, { 878,   "Sci-Fi"     },
            { 53,    "Thriller"    }, { 10752, "War"        },
            { 37,    "Western"     }, { 99,    "Documentary"},
            { 10751, "Family"      }, { 10402, "Music"      },
            { 10770, "Biography"   },
        };

        public TmdbController(IHttpClientFactory http, IConfiguration config)
        {
            _http   = http;
            _config = config;
        }

        // POST /api/tmdb/import?pages=3&category=popular
        [HttpPost("import")]
        public async Task<IActionResult> Import(
            [FromQuery] int    pages    = 1,
            [FromQuery] string category = "popular")
        {
            if (pages < 1 || pages > 10)
                return BadRequest(new { error = "pages must be between 1 and 10" });

            var validCategories = new[] { "popular", "top_rated", "upcoming", "now_playing" };
            if (!validCategories.Contains(category))
                return BadRequest(new { error = "invalid category" });

            var apiKey = _config["Tmdb:ApiKey"];
            if (string.IsNullOrEmpty(apiKey))
                return BadRequest(new { error = "TMDB API key not configured" });

            var client   = _http.CreateClient();
            var imported = 0;
            var skipped  = 0;
            var options  = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

            using var db = new WatchWorthDbContext();

            for (int page = 1; page <= pages; page++)
            {
                var url      = $"https://api.themoviedb.org/3/movie/{category}?api_key={apiKey}&language=en-US&page={page}";
                var response = await client.GetAsync(url);
                if (!response.IsSuccessStatusCode) continue;

                var json   = await response.Content.ReadAsStringAsync();
                var result = JsonSerializer.Deserialize<TmdbPageResponse>(json, options);
                if (result?.Results == null) continue;

                foreach (var m in result.Results)
                {
                    // Sări dacă există deja
                    if (db.Movies.Any(x => x.TmdbId == m.Id))
                    {
                        skipped++;
                        continue;
                    }

                    var genre = m.GenreIds?.FirstOrDefault() is int gid && GenreMap.ContainsKey(gid)
                        ? GenreMap[gid]
                        : "Drama";

                    var year = m.ReleaseDate?.Length >= 4 &&
                               int.TryParse(m.ReleaseDate[..4], out var y) ? y : DateTime.Now.Year;

                    db.Movies.Add(new Movie
                    {
                        TmdbId      = m.Id,
                        Title       = m.Title       ?? "Unknown",
                        Year        = year,
                        Description = m.Overview    ?? "",
                        Rating      = Math.Round(m.VoteAverage, 1),
                        Genre       = genre,
                        Image       = m.PosterPath != null
                            ? $"https://image.tmdb.org/t/p/w500{m.PosterPath}"
                            : "",
                    });
                    imported++;
                }

                await db.SaveChangesAsync();
            }

            return Ok(new { imported, skipped, total = imported + skipped });
        }
    }

    // ── TMDB DTOs ────────────────────────────────────────────────────────────
    public class TmdbPageResponse
    {
        [JsonPropertyName("results")]
        public List<TmdbMovieDto>? Results { get; set; }
    }

    public class TmdbMovieDto
    {
        [JsonPropertyName("id")]           public int         Id          { get; set; }
        [JsonPropertyName("title")]        public string?     Title       { get; set; }
        [JsonPropertyName("overview")]     public string?     Overview    { get; set; }
        [JsonPropertyName("vote_average")] public double      VoteAverage { get; set; }
        [JsonPropertyName("release_date")] public string?     ReleaseDate { get; set; }
        [JsonPropertyName("genre_ids")]    public List<int>?  GenreIds    { get; set; }
        [JsonPropertyName("poster_path")]  public string?     PosterPath  { get; set; }
    }
}