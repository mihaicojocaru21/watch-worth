using WatchWorth.BusinessLayer.DTOs;

namespace WatchWorth.BusinessLayer.Interfaces
{
    public interface IMovieService
    {
        IEnumerable<MovieDto> GetAllMovies(string? search, string? sort);
        MovieDto?             GetMovieById(int id);
        MovieDto              CreateMovie(CreateMovieDto dto);
        MovieDto?             UpdateMovie(int id, UpdateMovieDto dto);
        bool                  DeleteMovie(int id);
    }
}