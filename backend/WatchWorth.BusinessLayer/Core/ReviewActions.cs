using WatchWorth.DataAccessLayer.Context;
using WatchWorth.Domain.Entities;
using WatchWorth.Domain.Models.Responses;

namespace WatchWorth.BusinessLayer.Core
{
    public class ReviewActions
    {
        protected ReviewActions() { }

        protected List<Review> GetByMovieIdActionExecution(int movieId)
        {
            using (var db = new WatchWorthDbContext())
            {
                return db.Reviews
                    .Where(r => r.MovieId == movieId)
                    .OrderByDescending(r => r.CreatedAt)
                    .ToList();
            }
        }

        protected List<object> GetSummaryActionExecution()
        {
            using (var db = new WatchWorthDbContext())
            {
                return db.Reviews
                    .GroupBy(r => r.MovieId)
                    .Select(g => (object)new
                    {
                        movieId   = g.Key,
                        count     = g.Count(),
                        avgRating = Math.Round(g.Average(r => r.Rating), 1),
                    })
                    .ToList();
            }
        }

        protected bool ExistsForUserActionExecution(int movieId, int userId)
        {
            using (var db = new WatchWorthDbContext())
            {
                return db.Reviews.Any(r => r.MovieId == movieId && r.UserId == userId);
            }
        }

        protected ActionResponse AddReviewActionExecution(Review review)
        {
            using (var db = new WatchWorthDbContext())
            {
                db.Reviews.Add(review);
                db.SaveChanges();
            }
            return new ActionResponse { IsSuccess = true, Message = "Review added successfully." };
        }

        protected Review? GetReviewByIdActionExecution(string id)
        {
            using (var db = new WatchWorthDbContext())
            {
                return db.Reviews.Find(id);
            }
        }

        protected ActionResponse UpdateReviewActionExecution(Review review)
        {
            using (var db = new WatchWorthDbContext())
            {
                db.Reviews.Update(review);
                db.SaveChanges();
            }
            return new ActionResponse { IsSuccess = true, Message = "Review updated successfully." };
        }

        protected ActionResponse DeleteReviewActionExecution(Review review)
        {
            using (var db = new WatchWorthDbContext())
            {
                db.Reviews.Remove(review);
                db.SaveChanges();
            }
            return new ActionResponse { IsSuccess = true, Message = "Review deleted successfully." };
        }
    }
}