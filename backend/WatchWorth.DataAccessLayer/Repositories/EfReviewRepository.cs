using WatchWorth.BusinessLayer.Interfaces;
using WatchWorth.DataAccessLayer.Context;
using WatchWorth.Domain.Entities;

namespace WatchWorth.DataAccessLayer.Repositories
{
    public class EfReviewRepository : IReviewRepository
    {
        private readonly WatchWorthDbContext _ctx;

        public EfReviewRepository(WatchWorthDbContext ctx)
        {
            _ctx = ctx;
        }

        public List<Review> GetByMovieId(int movieId) =>
            _ctx.Reviews
                .Where(r => r.MovieId == movieId)
                .OrderByDescending(r => r.CreatedAt)
                .ToList();

        public List<object> GetSummary() =>
            _ctx.Reviews
                .GroupBy(r => r.MovieId)
                .Select(g => (object)new
                {
                    movieId   = g.Key,
                    count     = g.Count(),
                    avgRating = Math.Round(g.Average(r => r.Rating), 1),
                })
                .ToList();

        public bool ExistsForUser(int movieId, int userId) =>
            _ctx.Reviews.Any(r => r.MovieId == movieId && r.UserId == userId);

        public void Add(Review review)
        {
            _ctx.Reviews.Add(review);
            _ctx.SaveChanges();
        }

        public Review? GetById(string id) =>
            _ctx.Reviews.Find(id);

        public void Update(Review review)
        {
            _ctx.Reviews.Update(review);
            _ctx.SaveChanges();
        }

        public void Delete(Review review)
        {
            _ctx.Reviews.Remove(review);
            _ctx.SaveChanges();
        }
    }
}