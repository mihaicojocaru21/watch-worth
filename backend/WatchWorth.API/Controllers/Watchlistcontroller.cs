using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WatchWorth.API.Models;
using WatchWorth.API.Services;

namespace WatchWorth.API.Controllers;

[ApiController]
[Route("api/watchlist")]
[Authorize]
public class WatchlistController(JsonDb db) : ControllerBase
{
    // GET /api/watchlist  → returns movieIds[]
    [HttpGet]
    public IActionResult Get()
    {
        var userId = User.GetCurrentUser().Id;
        var entry  = db.GetWatchlists().FirstOrDefault(w => w.UserId == userId);
        return Ok(entry?.MovieIds ?? []);
    }

    // POST /api/watchlist/:movieId  → add
    [HttpPost("{movieId:int}")]
    public IActionResult Add(int movieId)
    {
        var userId = User.GetCurrentUser().Id;
        var lists  = db.GetWatchlists();
        var entry  = lists.FirstOrDefault(w => w.UserId == userId);

        if (entry is null)
        {
            entry = new Watchlist { UserId = userId, MovieIds = [movieId] };
            lists.Add(entry);
        }
        else if (!entry.MovieIds.Contains(movieId))
        {
            entry.MovieIds.Add(movieId);
        }

        db.SaveWatchlists(lists);
        return Ok(entry.MovieIds);
    }

    // DELETE /api/watchlist/:movieId  → remove
    [HttpDelete("{movieId:int}")]
    public IActionResult Remove(int movieId)
    {
        var userId = User.GetCurrentUser().Id;
        var lists  = db.GetWatchlists();
        var entry  = lists.FirstOrDefault(w => w.UserId == userId);

        if (entry is not null)
        {
            entry.MovieIds.Remove(movieId);
            db.SaveWatchlists(lists);
        }

        return Ok(entry?.MovieIds ?? []);
    }

    // DELETE /api/watchlist  → clear all
    [HttpDelete]
    public IActionResult Clear()
    {
        var userId = User.GetCurrentUser().Id;
        var lists  = db.GetWatchlists();
        var entry  = lists.FirstOrDefault(w => w.UserId == userId);

        if (entry is not null)
        {
            entry.MovieIds.Clear();
            db.SaveWatchlists(lists);
        }

        return Ok(new List<int>());
    }
}