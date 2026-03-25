using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WatchWorth.API.Models;
using WatchWorth.API.Services;

namespace WatchWorth.API.Controllers;

[ApiController]
public class ReviewsController(JsonDb db) : ControllerBase
{
    // GET /api/reviews/summary  → { movieId, count, avgRating }[]
    [HttpGet("api/reviews/summary")]
    public IActionResult GetSummary()
    {
        var summary = db.GetReviews()
            .GroupBy(r => r.MovieId)
            .Select(g => new
            {
                movieId   = g.Key,
                count     = g.Count(),
                avgRating = Math.Round(g.Average(r => r.Rating), 1),
            })
            .ToList();

        return Ok(summary);
    }

    // GET /api/movies/:movieId/reviews
    [HttpGet("api/movies/{movieId:int}/reviews")]
    public IActionResult GetByMovie(int movieId)
    {
        var reviews = db.GetReviews().Where(r => r.MovieId == movieId).ToList();
        return Ok(reviews);
    }

    // POST /api/movies/:movieId/reviews  (auth required)
    [HttpPost("api/movies/{movieId:int}/reviews")]
    [Authorize]
    public IActionResult Create(int movieId, [FromBody] CreateReviewRequest req)
    {
        if (req.Rating < 1 || req.Rating > 5)
            return BadRequest(new { error = "rating must be 1–5" });

        if (string.IsNullOrWhiteSpace(req.Text) || req.Text.Trim().Length < 10)
            return BadRequest(new { error = "review must be at least 10 characters" });

        var currentUser = User.GetCurrentUser();
        var reviews     = db.GetReviews();

        if (reviews.Any(r => r.MovieId == movieId && r.UserId == currentUser.Id))
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

        reviews.Insert(0, review);
        db.SaveReviews(reviews);
        return Created("", review);
    }

    // PUT /api/reviews/:id  (own review)
    [HttpPut("api/reviews/{id}")]
    [Authorize]
    public IActionResult Update(string id, [FromBody] UpdateReviewRequest req)
    {
        var currentUser = User.GetCurrentUser();
        var reviews     = db.GetReviews();
        var idx         = reviews.FindIndex(r => r.Id == id);

        if (idx == -1) return NotFound(new { error = "Review not found" });
        if (reviews[idx].UserId != currentUser.Id)
            return Forbid();

        if (req.Rating.HasValue) reviews[idx].Rating = req.Rating.Value;
        if (req.Text   != null)  reviews[idx].Text   = req.Text.Trim();
        reviews[idx].CreatedAt = DateTime.UtcNow.ToString("o");

        db.SaveReviews(reviews);
        return Ok(reviews[idx]);
    }

    // DELETE /api/reviews/:id  (own review or admin)
    [HttpDelete("api/reviews/{id}")]
    [Authorize]
    public IActionResult Delete(string id)
    {
        var currentUser = User.GetCurrentUser();
        var reviews     = db.GetReviews();
        var review      = reviews.FirstOrDefault(r => r.Id == id);

        if (review is null) return NotFound(new { error = "Review not found" });

        if (review.UserId != currentUser.Id && currentUser.Role != "admin")
            return Forbid();

        reviews.Remove(review);
        db.SaveReviews(reviews);
        return Ok(new { success = true });
    }
}