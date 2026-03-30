using WatchWorth.BusinessLayer.DTOs;
using WatchWorth.DataAccessLayer.Context;
using WatchWorth.Domain.Entities;
using WatchWorth.Domain.Models.Responses;

namespace WatchWorth.BusinessLayer.Core
{
    public class MovieActions
    {
        protected MovieActions() { }

        protected IEnumerable<MovieDto> GetAllMoviesActionExecution(string? search, string? sort)
        {
            List<Movie> movies;
            using (var db = new WatchWorthDbContext())
            {
                movies = db.Movies.ToList();
            }

            var result = movies.AsEnumerable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                var q = search.ToLower();
                result = result.Where(m =>
                    m.Title.ToLower().Contains(q) ||
                    m.Genre.ToLower().Contains(q));
            }

            result = sort switch
            {
                "year"  => result.OrderByDescending(m => m.Year),
                "genre" => result.OrderBy(m => m.Genre),
                "title" => result.OrderBy(m => m.Title),
                _       => result.OrderByDescending(m => m.Rating),
            };

            return result.Select(ToDto);
        }

        protected MovieDto? GetMovieByIdActionExecution(int id)
        {
            Movie? movie;
            using (var db = new WatchWorthDbContext())
            {
                movie = db.Movies.FirstOrDefault(m => m.Id == id);
            }

            return movie is null ? null : ToDto(movie);
        }

        protected MovieDto CreateMovieActionExecution(CreateMovieDto dto)
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

            using (var db = new WatchWorthDbContext())
            {
                db.Movies.Add(movie);
                db.SaveChanges();
            }

            return ToDto(movie);
        }

        protected ActionResponse UpdateMovieActionExecution(int id, UpdateMovieDto dto)
        {
            Movie? existing;
            using (var db = new WatchWorthDbContext())
            {
                existing = db.Movies.FirstOrDefault(m => m.Id == id);
                if (existing is null)
                    return new ActionResponse { IsSuccess = false, Message = "Movie not found." };

                existing.TmdbId      = dto.TmdbId      ?? existing.TmdbId;
                existing.Title       = dto.Title       ?? existing.Title;
                existing.Year        = dto.Year        ?? existing.Year;
                existing.Description = dto.Description ?? existing.Description;
                existing.Rating      = dto.Rating      ?? existing.Rating;
                existing.Image       = dto.Image       ?? existing.Image;
                existing.Genre       = dto.Genre       ?? existing.Genre;

                db.Movies.Update(existing);
                db.SaveChanges();
            }

            return new ActionResponse { IsSuccess = true, Message = "Movie updated successfully." };
        }

        protected ActionResponse DeleteMovieActionExecution(int id)
        {
            using (var db = new WatchWorthDbContext())
            {
                var movie = db.Movies.FirstOrDefault(m => m.Id == id);
                if (movie is null)
                    return new ActionResponse { IsSuccess = false, Message = "Movie not found." };

                db.Movies.Remove(movie);
                db.SaveChanges();
            }

            return new ActionResponse { IsSuccess = true, Message = "Movie deleted successfully." };
        }

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