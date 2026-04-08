using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WatchWorth.BusinessLayer;
using WatchWorth.BusinessLayer.DTOs;
using WatchWorth.BusinessLayer.Interfaces;

namespace WatchWorth.API.Controllers
{
    [Route("api/movies")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly IMovieAction _movies;

        public MoviesController()
        {
            var bl = new BusinessLogic();
            _movies = bl.MovieAction();
        }

        // GET api/movies?search=batman&sort=year
        [HttpGet]
        public IActionResult GetAll([FromQuery] string? search, [FromQuery] string? sort)
        {
            var result = _movies.GetAllMoviesAction(search, sort);
            return Ok(result);
        }

        // GET api/movies/5
        [HttpGet("{id:int}")]
        public IActionResult GetById(int id)
        {
            var movie = _movies.GetMovieByIdAction(id);
            if (movie is null) return NotFound(new { message = "Movie not found." });
            return Ok(movie);
        }

        // POST api/movies
        [Authorize(Roles = "admin")]
        [HttpPost]
        public IActionResult Create([FromBody] CreateMovieDto dto)
        {
            var created = _movies.CreateMovieAction(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        // PUT api/movies/5
        [Authorize(Roles = "admin")]
        [HttpPut("{id:int}")]
        public IActionResult Update(int id, [FromBody] UpdateMovieDto dto)
        {
            var response = _movies.UpdateMovieAction(id, dto);
            if (!response.IsSuccess) return NotFound(response);
            return Ok(response);
        }

        // DELETE api/movies/5
        [Authorize(Roles = "admin")]
        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            var response = _movies.DeleteMovieAction(id);
            if (!response.IsSuccess) return NotFound(response);
            return Ok(response);
        }
    }
}