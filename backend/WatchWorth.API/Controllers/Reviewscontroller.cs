using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WatchWorth.API.Extensions;
using WatchWorth.BusinessLayer;
using WatchWorth.BusinessLayer.Interfaces;
using WatchWorth.Domain.Entities;

namespace WatchWorth.API.Controllers
{
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly IReviewAction _reviews;

        public ReviewsController()
        {
            var bl = new BusinessLogic();
            _reviews = bl.ReviewAction();
        }

        // GET /api/reviews/summary
        [HttpGet("api/reviews/summary")]
        public IActionResult GetSummary() =>
            Ok(_reviews.GetSummaryAction());

        // GET /api/movies/{movieId}/reviews
        [HttpGet("api/movies/{movieId:int}/reviews")]
        public IActionResult GetByMovie(int movieId) =>
            Ok(_reviews.GetByMovieIdAction(movieId));

        // POST /api/movies/{movieId}/reviews  (auth required)
        [HttpPost("api/movies/{movieId:int}/reviews")]
        [Authorize]
        public IActionResult Create(int movieId, [FromBody] CreateReviewRequest req)
        {
            if (req.Rating < 1 || req.Rating > 5)
                return BadRequest(new { error = "rating must be 1–5" });

            if (string.IsNullOrWhiteSpace(req.Text) || req.Text.Trim().Length < 10)
                return BadRequest(new { error = "review must be at least 10 characters" });

            var currentUser = User.GetCurrentUser();

            if (_reviews.ExistsForUserAction(movieId, currentUser.Id))
                return Conflict(new { error = "You already reviewed this movie" });

            var review = new Review
            {
                Id        = $"{currentUser.Id}-{movieId}-{DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()}",
                MovieId   = movieId,
                UserId    = currentUser.Id,
                Username  = currentUser.Username,
                Rating    = req.Rating,
                Text      = req.Text.Trim(),
                CreatedAt = DateTime.UtcNow.ToString("o"),
            };

            try { _reviews.AddReviewAction(review); }
            catch { return StatusCode(500, new { error = "Failed to save review" }); }
            return Created("", review);
        }

        // PUT /api/reviews/{id}
        [HttpPut("api/reviews/{id}")]
        [Authorize]
        public IActionResult Update(string id, [FromBody] UpdateReviewRequest req)
        {
            var currentUser = User.GetCurrentUser();
            var review = _reviews.GetReviewByIdAction(id);

            if (review is null) return NotFound(new { error = "Review not found" });
            if (review.UserId != currentUser.Id) return Forbid();

            if (req.Rating.HasValue)
            {
                if (req.Rating.Value < 1 || req.Rating.Value > 5)
                    return BadRequest(new { error = "rating must be 1–5" });
                review.Rating = req.Rating.Value;
            }
            if (req.Text != null)
            {
                if (req.Text.Trim().Length < 10)
                    return BadRequest(new { error = "review must be at least 10 characters" });
                review.Text = req.Text.Trim();
            }
            review.CreatedAt = DateTime.UtcNow.ToString("o");

            try { _reviews.UpdateReviewAction(review); }
            catch { return StatusCode(500, new { error = "Failed to update review" }); }
            return Ok(review);
        }

        // DELETE /api/reviews/{id}
        [HttpDelete("api/reviews/{id}")]
        [Authorize]
        public IActionResult Delete(string id)
        {
            var currentUser = User.GetCurrentUser();
            var review = _reviews.GetReviewByIdAction(id);

            if (review is null) return NotFound(new { error = "Review not found" });
            if (review.UserId != currentUser.Id && currentUser.Role != "admin") return Forbid();

            try { _reviews.DeleteReviewAction(review); }
            catch { return StatusCode(500, new { error = "Failed to delete review" }); }
            return Ok(new { success = true });
        }
    }

    public class CreateReviewRequest
    {
        public int    Rating { get; set; }
        public string Text   { get; set; } = "";
    }

    public class UpdateReviewRequest
    {
        public int?    Rating { get; set; }
        public string? Text   { get; set; }
    }
}