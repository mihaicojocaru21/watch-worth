using WatchWorth.BusinessLayer.DTOs;
using WatchWorth.Domain.Models.Responses;

namespace WatchWorth.BusinessLayer.Interfaces
{
    public interface IMovieAction
    {
        IEnumerable<MovieDto> GetAllMoviesAction(string? search, string? sort);
        MovieDto?             GetMovieByIdAction(int id);
        MovieDto              CreateMovieAction(CreateMovieDto dto);
        ActionResponse        UpdateMovieAction(int id, UpdateMovieDto dto);
        ActionResponse        DeleteMovieAction(int id);
    }
}