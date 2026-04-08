using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WatchWorth.API.Extensions;
using WatchWorth.BusinessLayer;
using WatchWorth.BusinessLayer.Interfaces;

namespace WatchWorth.API.Controllers
{
    [Route("api/watchlist")]
    [ApiController]
    [Authorize]
    public class WatchlistController : ControllerBase
    {
        private readonly IWatchlistAction _watchlist;

        public WatchlistController()
        {
            var bl = new BusinessLogic();
            _watchlist = bl.WatchlistAction();
        }

        // GET /api/watchlist
        [HttpGet]
        public IActionResult Get()
        {
            var userId = User.GetCurrentUser().Id;
            return Ok(_watchlist.GetMovieIdsAction(userId));
        }

        // POST /api/watchlist/{movieId}
        [HttpPost("{movieId:int}")]
        public IActionResult Add(int movieId)
        {
            var userId = User.GetCurrentUser().Id;
            _watchlist.AddMovieAction(userId, movieId);
            return Ok(_watchlist.GetMovieIdsAction(userId));
        }

        // DELETE /api/watchlist/{movieId}
        [HttpDelete("{movieId:int}")]
        public IActionResult Remove(int movieId)
        {
            var userId = User.GetCurrentUser().Id;
            _watchlist.RemoveMovieAction(userId, movieId);
            return Ok(_watchlist.GetMovieIdsAction(userId));
        }

        // DELETE /api/watchlist
        [HttpDelete]
        public IActionResult Clear()
        {
            var userId = User.GetCurrentUser().Id;
            _watchlist.ClearWatchlistAction(userId);
            return Ok(new List<int>());
        }
    }
}