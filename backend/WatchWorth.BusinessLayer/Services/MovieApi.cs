using WatchWorth.BusinessLayer.DTOs;
using WatchWorth.BusinessLayer.Interfaces;
using WatchWorth.Domain.Entities;

namespace WatchWorth.BusinessLayer.Services
{
    /// <summary>
    /// Base class that holds the real implementation logic ("Action" methods).
    /// MovieBL inherits from this and delegates to these methods,
    /// following the pattern: MovieBL : MovieApi, IMovieService
    /// </summary>
    public class MovieApi
    {
        private readonly IMovieRepository _repo;

        public MovieApi(IMovieRepository repo)
        {
            _repo = repo;
        }

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
            var movie = _repo.GetById(id);
            return movie is null ? null : ToDto(movie);
        }

        protected MovieDto CreateMovieAction(CreateMovieDto dto)
        {
            var movie = new Movie
            {
                TmdbId      = dto.TmdbId,
                Title       = dto.Title,
                Year        = dto.Year,
                Description = dto.Description,
                Rating      = dto.Rating,
                Image       = dto.Image,
                Genre       = dto.Genre,
            };

            _repo.Add(movie);  // EF Core assigns the Id after insert
            return ToDto(movie);
        }

        protected MovieDto? UpdateMovieAction(int id, UpdateMovieDto dto)
        {
            var existing = _repo.GetById(id);
            if (existing is null) return null;

            existing.TmdbId      = dto.TmdbId      ?? existing.TmdbId;
            existing.Title       = dto.Title       ?? existing.Title;
            existing.Year        = dto.Year        ?? existing.Year;
            existing.Description = dto.Description ?? existing.Description;
            existing.Rating      = dto.Rating      ?? existing.Rating;
            existing.Image       = dto.Image       ?? existing.Image;
            existing.Genre       = dto.Genre       ?? existing.Genre;

            _repo.Update(existing);
            return ToDto(existing);
        }

        protected bool DeleteMovieAction(int id) =>
            _repo.Delete(id);

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