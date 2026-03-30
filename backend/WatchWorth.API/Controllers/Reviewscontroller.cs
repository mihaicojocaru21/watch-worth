using Microsoft.AspNetCore.Mvc;
using WatchWorth.BusinessLayer;
using WatchWorth.BusinessLayer.Interfaces;
using WatchWorth.Domain.Entities;

namespace WatchWorth.API.Controllers
{
    [Route("api/reviews")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly IReviewAction _reviews;

        public ReviewsController()
        {
            var bl = new BusinessLogic();
            _reviews = bl.ReviewAction();
        }

        // GET api/reviews/movie/5
        [HttpGet("movie/{movieId:int}")]
        public IActionResult GetByMovie(int movieId)
        {
            var result = _reviews.GetByMovieIdAction(movieId);
            return Ok(result);
        }

        // GET api/reviews/summary
        [HttpGet("summary")]
        public IActionResult GetSummary()
        {
            var result = _reviews.GetSummaryAction();
            return Ok(result);
        }

        // GET api/reviews/exists?movieId=5&userId=1
        [HttpGet("exists")]
        public IActionResult Exists([FromQuery] int movieId, [FromQuery] int userId)
        {
            var exists = _reviews.ExistsForUserAction(movieId, userId);
            return Ok(new { exists });
        }

        // POST api/reviews
        [HttpPost]
        public IActionResult Add([FromBody] Review review)
        {
            review.CreatedAt = DateTime.UtcNow.ToString("o");
            var response = _reviews.AddReviewAction(review);
            return Ok(response);
        }

        // PUT api/reviews
        [HttpPut]
        public IActionResult Update([FromBody] Review review)
        {
            var existing = _reviews.GetReviewByIdAction(review.Id);
            if (existing is null)
                return NotFound(new { isSuccess = false, message = "Review not found." });

            existing.Rating = review.Rating;
            existing.Text   = review.Text;

            var response = _reviews.UpdateReviewAction(existing);
            return Ok(response);
        }

        // DELETE api/reviews/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var existing = _reviews.GetReviewByIdAction(id);
            if (existing is null)
                return NotFound(new { isSuccess = false, message = "Review not found." });

            var response = _reviews.DeleteReviewAction(existing);
            return Ok(response);
        }
    }
}