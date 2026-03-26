using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WatchWorth.BusinessLayer.DTOs;
using WatchWorth.BusinessLayer.Interfaces;

namespace WatchWorth.API.Controllers;

[ApiController]
[Route("api/movies")]
public class MoviesController(IMovieService movieService) : ControllerBase
{
    // GET /api/movies?search=&sort=rating
    [HttpGet]
    public IActionResult GetAll([FromQuery] string? search, [FromQuery] string? sort)
    {
        var movies = movieService.GetAllMovies(search, sort);
        return Ok(movies);
    }

    // GET /api/movies/:id
    [HttpGet("{id:int}")]
    public IActionResult GetById(int id)
    {
        var movie = movieService.GetMovieById(id);
        return movie is null ? NotFound(new { error = "Movie not found" }) : Ok(movie);
    }

    // POST /api/movies  (admin only)
    [HttpPost]
    [Authorize(Roles = "admin")]
    public IActionResult Create([FromBody] CreateMovieDto req)
    {
        if (string.IsNullOrWhiteSpace(req.Title) ||
            string.IsNullOrWhiteSpace(req.Genre) ||
            req.Year == 0)
            return BadRequest(new { error = "title, genre and year are required" });

        var created = movieService.CreateMovie(req);
        return Created($"/api/movies/{created.Id}", created);
    }

    // PUT /api/movies/:id  (admin only)
    [HttpPut("{id:int}")]
    [Authorize(Roles = "admin")]
    public IActionResult Update(int id, [FromBody] UpdateMovieDto req)
    {
        var updated = movieService.UpdateMovie(id, req);
        return updated is null ? NotFound(new { error = "Movie not found" }) : Ok(updated);
    }

    // DELETE /api/movies/:id  (admin only)
    [HttpDelete("{id:int}")]
    [Authorize(Roles = "admin")]
    public IActionResult Delete(int id)
    {
        var deleted = movieService.DeleteMovie(id);
        return deleted ? Ok(new { success = true }) : NotFound(new { error = "Movie not found" });
    }
}