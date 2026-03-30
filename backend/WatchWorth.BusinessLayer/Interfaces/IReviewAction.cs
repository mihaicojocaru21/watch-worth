using WatchWorth.Domain.Entities;
using WatchWorth.Domain.Models.Responses;

namespace WatchWorth.BusinessLayer.Interfaces
{
    public interface IReviewAction
    {
        List<Review> GetByMovieIdAction(int movieId);
        List<object> GetSummaryAction();
        bool         ExistsForUserAction(int movieId, int userId);
        ActionResponse AddReviewAction(Review review);
        Review?      GetReviewByIdAction(string id);
        ActionResponse UpdateReviewAction(Review review);
        ActionResponse DeleteReviewAction(Review review);
    }
}