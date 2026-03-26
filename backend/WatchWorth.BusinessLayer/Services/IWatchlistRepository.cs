namespace WatchWorth.BusinessLayer.Interfaces
{
    public interface IWatchlistRepository
    {
        List<int> GetMovieIds(int userId);
        void      AddMovie(int userId, int movieId);
        void      RemoveMovie(int userId, int movieId);
        void      Clear(int userId);
    }
}