using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WatchWorth.API.Models;
using WatchWorth.API.Services;
using WatchWorth.BusinessLayer.Interfaces;
using WatchWorth.Domain.Entities;

namespace WatchWorth.API.Controllers;

[ApiController]
public class ReviewsController(IReviewRepository reviewRepo) : ControllerBase
{
    // GET /api/reviews/summary
    [HttpGet("api/reviews/summary")]
    public IActionResult GetSummary() =>
        Ok(reviewRepo.GetSummary());

    // GET /api/movies/:movieId/reviews
    [HttpGet("api/movies/{movieId:int}/reviews")]
    public IActionResult GetByMovie(int movieId) =>
        Ok(reviewRepo.GetByMovieId(movieId));

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

        if (reviewRepo.ExistsForUser(movieId, currentUser.Id))
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

        reviewRepo.Add(review);
        return Created("", review);
    }

    // PUT /api/reviews/:id  (own review)
    [HttpPut("api/reviews/{id}")]
    [Authorize]
    public IActionResult Update(string id, [FromBody] UpdateReviewRequest req)
    {
        var currentUser = User.GetCurrentUser();
        var review      = reviewRepo.GetById(id);

        if (review is null) return NotFound(new { error = "Review not found" });
        if (review.UserId != currentUser.Id) return Forbid();

        if (req.Rating.HasValue) review.Rating = req.Rating.Value;
        if (req.Text != null)    review.Text   = req.Text.Trim();
        review.CreatedAt = DateTime.UtcNow.ToString("o");

        reviewRepo.Update(review);
        return Ok(review);
    }

    // DELETE /api/reviews/:id  (own review or admin)
    [HttpDelete("api/reviews/{id}")]
    [Authorize]
    public IActionResult Delete(string id)
    {
        var currentUser = User.GetCurrentUser();
        var review      = reviewRepo.GetById(id);

        if (review is null) return NotFound(new { error = "Review not found" });
        if (review.UserId != currentUser.Id && currentUser.Role != "admin") return Forbid();

        reviewRepo.Delete(review);
        return Ok(new { success = true });
    }
}