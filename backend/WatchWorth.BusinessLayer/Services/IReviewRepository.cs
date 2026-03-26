using WatchWorth.Domain.Entities;

namespace WatchWorth.BusinessLayer.Interfaces
{
    public interface IReviewRepository
    {
        List<Review> GetByMovieId(int movieId);
        List<object> GetSummary();
        Review?      GetById(string id);
        bool         ExistsForUser(int movieId, int userId);
        void         Add(Review review);
        void         Update(Review review);
        void         Delete(Review review);
    }
}