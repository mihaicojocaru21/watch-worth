using WatchWorth.BusinessLayer.Core;
using WatchWorth.BusinessLayer.Interfaces;
using WatchWorth.Domain.Entities;
using WatchWorth.Domain.Models.Responses;

namespace WatchWorth.BusinessLayer.Structure
{
    public class ReviewExecution : ReviewActions, IReviewAction
    {
        public List<Review> GetByMovieIdAction(int movieId)
            => GetByMovieIdActionExecution(movieId);

        public List<object> GetSummaryAction()
            => GetSummaryActionExecution();

        public bool ExistsForUserAction(int movieId, int userId)
            => ExistsForUserActionExecution(movieId, userId);

        public ActionResponse AddReviewAction(Review review)
            => AddReviewActionExecution(review);

        public Review? GetReviewByIdAction(string id)
            => GetReviewByIdActionExecution(id);

        public ActionResponse UpdateReviewAction(Review review)
            => UpdateReviewActionExecution(review);

        public ActionResponse DeleteReviewAction(Review review)
            => DeleteReviewActionExecution(review);
    }
}