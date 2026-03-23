using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WatchWorth.API.Models;
using WatchWorth.API.Services;

namespace WatchWorth.API.Controllers;

[ApiController]
[Route("api/movies")]
public class MoviesController(JsonDb db) : ControllerBase
{
    // GET /api/movies?search=&sort=rating
    [HttpGet]
    public IActionResult GetAll([FromQuery] string? search, [FromQuery] string? sort)
    {
        var movies = db.GetMovies().AsEnumerable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            var q = search.ToLower();
            movies = movies.Where(m =>
                m.Title.ToLower().Contains(q) || m.Genre.ToLower().Contains(q));
        }

        movies = sort switch
        {
            "year"   => movies.OrderByDescending(m => m.Year),
            "genre"  => movies.OrderBy(m => m.Genre),
            "title"  => movies.OrderBy(m => m.Title),
            _        => movies.OrderByDescending(m => m.Rating),
        };

        return Ok(movies.ToList());
    }

    // GET /api/movies/:id
    [HttpGet("{id:int}")]
    public IActionResult GetById(int id)
    {
        var movie = db.GetMovies().FirstOrDefault(m => m.Id == id);
        return movie is null ? NotFound(new { error = "Movie not found" }) : Ok(movie);
    }

    // POST /api/movies  (admin only)
    [HttpPost]
    [Authorize(Roles = "admin")]
    public IActionResult Create([FromBody] CreateMovieRequest req)
    {
        if (string.IsNullOrWhiteSpace(req.Title) || string.IsNullOrWhiteSpace(req.Genre) || req.Year == 0)
            return BadRequest(new { error = "title, genre and year are required" });

        var movies   = db.GetMovies();
        var newMovie = new Movie
        {
            Id          = (int)DateTimeOffset.UtcNow.ToUnixTimeMilliseconds(),
            TmdbId      = req.TmdbId,
            Title       = req.Title,
            Year        = req.Year,
            Description = req.Description,
            Rating      = req.Rating,
            Image       = req.Image,
            Genre       = req.Genre,
        };

        movies.Insert(0, newMovie);
        db.SaveMovies(movies);
        return Created($"/api/movies/{newMovie.Id}", newMovie);
    }

    // PUT /api/movies/:id  (admin only)
    [HttpPut("{id:int}")]
    [Authorize(Roles = "admin")]
    public IActionResult Update(int id, [FromBody] Movie update)
    {
        var movies = db.GetMovies();
        var idx    = movies.FindIndex(m => m.Id == id);
        if (idx == -1) return NotFound(new { error = "Movie not found" });

        var existing = movies[idx];
        movies[idx] = new Movie
        {
            Id          = existing.Id,
            TmdbId      = update.TmdbId      != 0      ? update.TmdbId      : existing.TmdbId,
            Title       = !string.IsNullOrWhiteSpace(update.Title)       ? update.Title       : existing.Title,
            Year        = update.Year        != 0      ? update.Year        : existing.Year,
            Description = !string.IsNullOrWhiteSpace(update.Description) ? update.Description : existing.Description,
            Rating      = update.Rating      != 0      ? update.Rating      : existing.Rating,
            Image       = update.Image       ?? existing.Image,
            Genre       = !string.IsNullOrWhiteSpace(update.Genre)       ? update.Genre       : existing.Genre,
        };

        db.SaveMovies(movies);
        return Ok(movies[idx]);
    }

    // DELETE /api/movies/:id  (admin only)
    [HttpDelete("{id:int}")]
    [Authorize(Roles = "admin")]
    public IActionResult Delete(int id)
    {
        var movies  = db.GetMovies();
        var removed = movies.RemoveAll(m => m.Id == id);
        if (removed == 0) return NotFound(new { error = "Movie not found" });
        db.SaveMovies(movies);
        return Ok(new { success = true });
    }
}