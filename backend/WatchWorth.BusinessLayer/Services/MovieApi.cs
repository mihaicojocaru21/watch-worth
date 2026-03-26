using WatchWorth.BusinessLayer.DTOs;
using WatchWorth.BusinessLayer.Interfaces;
using WatchWorth.Domain.Entities;

namespace WatchWorth.BusinessLayer.Services
{
    /// <summary>
    /// Base class that holds the real implementation logic ("Action" methods).
    /// Concrete BL classes inherit from this and delegate to these methods,
    /// following the pattern: XxxBL : UserApi, IXxx
    /// </summary>
    public class UserApi
    {
        private readonly IMovieRepository _repo;

        public UserApi(IMovieRepository repo)
        {
            _repo = repo;
        }

        // ── Movie actions ─────────────────────────────────────────────────────

        protected IEnumerable<MovieDto> GetAllMoviesAction(string? search, string? sort)
        {
            var movies = _repo.GetAll().AsEnumerable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                var q = search.ToLower();
                movies = movies.Where(m =>
                    m.Title.ToLower().Contains(q) ||
                    m.Genre.ToLower().Contains(q));
            }

            movies = sort switch
            {
                "year"  => movies.OrderByDescending(m => m.Year),
                "genre" => movies.OrderBy(m => m.Genre),
                "title" => movies.OrderBy(m => m.Title),
                _       => movies.OrderByDescending(m => m.Rating),
            };

            return movies.Select(ToDto);
        }

        protected MovieDto? GetMovieByIdAction(int id)
        {
            var movie = _repo.GetAll().FirstOrDefault(m => m.Id == id);
            return movie is null ? null : ToDto(movie);
        }

        protected MovieDto CreateMovieAction(CreateMovieDto dto)
        {
            var movies = _repo.GetAll();

            var newMovie = new Movie
            {
                Id          = (int)DateTimeOffset.UtcNow.ToUnixTimeMilliseconds(),
                TmdbId      = dto.TmdbId,
                Title       = dto.Title,
                Year        = dto.Year,
                Description = dto.Description,
                Rating      = dto.Rating,
                Image       = dto.Image,
                Genre       = dto.Genre,
            };

            movies.Insert(0, newMovie);
            _repo.Save(movies);

            return ToDto(newMovie);
        }

        protected MovieDto? UpdateMovieAction(int id, UpdateMovieDto dto)
        {
            var movies = _repo.GetAll();
            var idx    = movies.FindIndex(m => m.Id == id);
            if (idx == -1) return null;

            var existing = movies[idx];
            movies[idx] = new Movie
            {
                Id          = existing.Id,
                TmdbId      = dto.TmdbId      ?? existing.TmdbId,
                Title       = dto.Title       ?? existing.Title,
                Year        = dto.Year        ?? existing.Year,
                Description = dto.Description ?? existing.Description,
                Rating      = dto.Rating      ?? existing.Rating,
                Image       = dto.Image       ?? existing.Image,
                Genre       = dto.Genre       ?? existing.Genre,
            };

            _repo.Save(movies);
            return ToDto(movies[idx]);
        }

        protected bool DeleteMovieAction(int id)
        {
            var movies  = _repo.GetAll();
            var removed = movies.RemoveAll(m => m.Id == id);
            if (removed == 0) return false;
            _repo.Save(movies);
            return true;
        }

        // ── Mapping helper ────────────────────────────────────────────────────

        private static MovieDto ToDto(Movie m) => new()
        {
            Id          = m.Id,
            TmdbId      = m.TmdbId,
            Title       = m.Title,
            Year        = m.Year,
            Description = m.Description,
            Rating      = m.Rating,
            Image       = m.Image,
            Genre       = m.Genre,
        };
    }
}