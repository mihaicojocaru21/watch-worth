using Microsoft.AspNetCore.Mvc;
using WatchWorth.BusinessLayer;
using WatchWorth.BusinessLayer.Interfaces;

namespace WatchWorth.API.Controllers
{
    [Route("api/watchlist")]
    [ApiController]
    public class WatchlistController : ControllerBase
    {
        private readonly IWatchlistAction _watchlist;

        public WatchlistController()
        {
            var bl = new BusinessLogic();
            _watchlist = bl.WatchlistAction();
        }

        // GET api/watchlist/{userId}
        [HttpGet("{userId:int}")]
        public IActionResult Get(int userId)
        {
            var movieIds = _watchlist.GetMovieIdsAction(userId);
            return Ok(movieIds);
        }

        // POST api/watchlist/{userId}/{movieId}
        [HttpPost("{userId:int}/{movieId:int}")]
        public IActionResult Add(int userId, int movieId)
        {
            _watchlist.AddMovieAction(userId, movieId);
            return Ok(new { isSuccess = true, message = "Movie added to watchlist." });
        }

        // DELETE api/watchlist/{userId}/{movieId}
        [HttpDelete("{userId:int}/{movieId:int}")]
        public IActionResult Remove(int userId, int movieId)
        {
            _watchlist.RemoveMovieAction(userId, movieId);
            return Ok(new { isSuccess = true, message = "Movie removed from watchlist." });
        }

        // DELETE api/watchlist/{userId}
        [HttpDelete("{userId:int}")]
        public IActionResult Clear(int userId)
        {
            _watchlist.ClearWatchlistAction(userId);
            return Ok(new { isSuccess = true, message = "Watchlist cleared." });
        }
    }
}