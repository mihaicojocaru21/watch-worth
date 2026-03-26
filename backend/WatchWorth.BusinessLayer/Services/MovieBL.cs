using WatchWorth.BusinessLayer.DTOs;
using WatchWorth.BusinessLayer.Interfaces;

namespace WatchWorth.BusinessLayer.Services
{
    public class MovieBL : UserApi, IMovieService
    {
        public MovieBL(IMovieRepository repo) : base(repo) { }

        public IEnumerable<MovieDto> GetAllMovies(string? search, string? sort)
            => GetAllMoviesAction(search, sort);

        public MovieDto? GetMovieById(int id)
            => GetMovieByIdAction(id);

        public MovieDto CreateMovie(CreateMovieDto dto)
            => CreateMovieAction(dto);

        public MovieDto? UpdateMovie(int id, UpdateMovieDto dto)
            => UpdateMovieAction(id, dto);

        public bool DeleteMovie(int id)
            => DeleteMovieAction(id);
    }
}