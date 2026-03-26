using WatchWorth.BusinessLayer.Interfaces;
using WatchWorth.Domain.Entities;

namespace WatchWorth.API.Repositories
{
    public class JsonMovieRepository : IMovieRepository
    {
        private readonly Services.JsonDb _db;

        public JsonMovieRepository(Services.JsonDb db)
        {
            _db = db;
        }

        public List<Domain.Entities.Movie> GetAll()
        {
            return _db.GetMovies().Select(m => new Domain.Entities.Movie
            {
                Id          = m.Id,
                TmdbId      = m.TmdbId,
                Title       = m.Title,
                Year        = m.Year,
                Description = m.Description,
                Rating      = m.Rating,
                Image       = m.Image,
                Genre       = m.Genre,
            }).ToList();
        }

        public void Save(List<Domain.Entities.Movie> movies)
        {
            _db.SaveMovies(movies.Select(m => new Models.Movie
            {
                Id          = m.Id,
                TmdbId      = m.TmdbId,
                Title       = m.Title,
                Year        = m.Year,
                Description = m.Description,
                Rating      = m.Rating,
                Image       = m.Image,
                Genre       = m.Genre,
            }).ToList());
        }
    }
}