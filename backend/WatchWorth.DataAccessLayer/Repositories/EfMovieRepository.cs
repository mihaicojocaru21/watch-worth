using Microsoft.EntityFrameworkCore;
using WatchWorth.BusinessLayer.Interfaces;
using WatchWorth.DataAccessLayer.Context;
using WatchWorth.Domain.Entities;

namespace WatchWorth.DataAccessLayer.Repositories
{
    public class EfMovieRepository : IMovieRepository
    {
        private readonly WatchWorthDbContext _ctx;

        public EfMovieRepository(WatchWorthDbContext ctx)
        {
            _ctx = ctx;
        }

        public List<Movie> GetAll() =>
            _ctx.Movies.AsNoTracking().ToList();

        public Movie? GetById(int id) =>
            _ctx.Movies.AsNoTracking().FirstOrDefault(m => m.Id == id);

        public void Add(Movie movie)
        {
            _ctx.Movies.Add(movie);
            _ctx.SaveChanges();
        }

        public void Update(Movie movie)
        {
            _ctx.Movies.Update(movie);
            _ctx.SaveChanges();
        }

        public bool Delete(int id)
        {
            var movie = _ctx.Movies.Find(id);
            if (movie is null) return false;
            _ctx.Movies.Remove(movie);
            _ctx.SaveChanges();
            return true;
        }
    }
}