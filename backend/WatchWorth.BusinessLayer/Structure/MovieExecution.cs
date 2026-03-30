using WatchWorth.BusinessLayer.Core;
using WatchWorth.BusinessLayer.DTOs;
using WatchWorth.BusinessLayer.Interfaces;
using WatchWorth.Domain.Models.Responses;

namespace WatchWorth.BusinessLayer.Structure
{
    public class MovieExecution : MovieActions, IMovieAction
    {
        public IEnumerable<MovieDto> GetAllMoviesAction(string? search, string? sort)
            => GetAllMoviesActionExecution(search, sort);

        public MovieDto? GetMovieByIdAction(int id)
            => GetMovieByIdActionExecution(id);

        public MovieDto CreateMovieAction(CreateMovieDto dto)
            => CreateMovieActionExecution(dto);

        public ActionResponse UpdateMovieAction(int id, UpdateMovieDto dto)
            => UpdateMovieActionExecution(id, dto);

        public ActionResponse DeleteMovieAction(int id)
            => DeleteMovieActionExecution(id);
    }
}