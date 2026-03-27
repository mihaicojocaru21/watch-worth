using WatchWorth.Domain.Entities;

namespace WatchWorth.BusinessLayer.Interfaces
{
    public interface IMovieRepository
    {
        List<Movie> GetAll();
        Movie?      GetById(int id);
        void        Add(Movie movie);
        void        Update(Movie movie);
        bool        Delete(int id);
    }
}