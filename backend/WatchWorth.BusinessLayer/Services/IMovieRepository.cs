using WatchWorth.Domain.Entities;

namespace WatchWorth.BusinessLayer.Interfaces
{
    public interface IMovieRepository
    {
        List<Movie> GetAll();
        void        Save(List<Movie> movies);
    }
}