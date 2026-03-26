using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WatchWorth.API.Services;
using WatchWorth.BusinessLayer.Interfaces;

namespace WatchWorth.API.Controllers;

[ApiController]
[Route("api/watchlist")]
[Authorize]
public class WatchlistController(IWatchlistRepository watchlistRepo) : ControllerBase
{
    // GET /api/watchlist
    [HttpGet]
    public IActionResult Get()
    {
        var userId = User.GetCurrentUser().Id;
        return Ok(watchlistRepo.GetMovieIds(userId));
    }

    // POST /api/watchlist/:movieId
    [HttpPost("{movieId:int}")]
    public IActionResult Add(int movieId)
    {
        var userId = User.GetCurrentUser().Id;
        watchlistRepo.AddMovie(userId, movieId);
        return Ok(watchlistRepo.GetMovieIds(userId));
    }

    // DELETE /api/watchlist/:movieId
    [HttpDelete("{movieId:int}")]
    public IActionResult Remove(int movieId)
    {
        var userId = User.GetCurrentUser().Id;
        watchlistRepo.RemoveMovie(userId, movieId);
        return Ok(watchlistRepo.GetMovieIds(userId));
    }

    // DELETE /api/watchlist
    [HttpDelete]
    public IActionResult Clear()
    {
        var userId = User.GetCurrentUser().Id;
        watchlistRepo.Clear(userId);
        return Ok(new List<int>());
    }
}